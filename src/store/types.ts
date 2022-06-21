import { AccountTypes } from '@/store/modules/account/types';

export interface Test {
  test: string,
}

export interface AllStateTypes extends Test {
  accountModule: AccountTypes,
}
