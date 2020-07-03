import { bootstrap } from '@vendure/core';
import config from './config';

bootstrap(config).catch((err) => {
  // tslint:disable-next-line:no-console
  console.log(err);
});
