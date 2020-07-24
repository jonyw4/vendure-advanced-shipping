import {
  Logger,
  Order,
  OrderService,
  RequestContext,
  ChannelService,
  LanguageCode,
  EventBus,
  VendureEvent
} from '@vendure/core';
import { InjectConnection } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

/**
 * This event is fired whenever an Order is cancelled by Pickup In Store Cron Job
 */
class PickupInStoreCancelOrder extends VendureEvent {
  ctx: RequestContext;
  order: Order;
  constructor(ctx: RequestContext, order: Order) {
    super();
    this.ctx = ctx;
    this.order = order;
  }
}

@Injectable()
export class PickupInStoreCronService {
  constructor(
    @InjectConnection() private connection: Connection,
    private orderService: OrderService,
    private channelService: ChannelService,
    private eventBus: EventBus
  ) {}
  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async cancelOrdersStuckInStore() {
    Logger.debug(
      'Checking orders that users did not pickup',
      'PickupInStoreCronJob'
    );

    const ctx = await this.createContext();
    const orders = await this.connection
      .getRepository(Order)
      .createQueryBuilder('order')
      .where('updatedAt + INTERVAL 7 DAY < NOW()')
      .andWhere("shippingMethod = 'pickup-in-store'")
      .andWhere("state = 'Packed'")
      .getMany();

    const promises: Promise<any>[] = [];
    for (const order of orders) {
      promises.push(this.cancelOrder(ctx, order));
    }
    await Promise.all(promises);
    Logger.debug(`Finish cron job`, 'PickupInStoreCronJob');
  }
  private async cancelOrder(ctx: RequestContext, order: Order): Promise<void> {
    Logger.debug(`Cancelling order ${order.id}`, 'PickupInStoreCronJob');
    await this.orderService.cancelOrder(ctx, { orderId: String(order.id) });
    this.eventBus.publish(new PickupInStoreCancelOrder(ctx, order));
  }
  private async createContext(): Promise<RequestContext> {
    const channel = await this.channelService.getDefaultChannel();
    const ctx = new RequestContext({
      apiType: 'admin',
      isAuthorized: true,
      authorizedAsOwnerOnly: false,
      channel,
      languageCode: LanguageCode.en
    });
    return ctx;
  }
}
