export type Unarray<T> = T extends (infer U)[] ? U : T;
