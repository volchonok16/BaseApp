import { TMetadata } from './metadata.type';

export type WithClientMeta<T> = { meta: TMetadata } & T;
