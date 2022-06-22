import { AccountTypes } from '@/store/modules/account/interface';

export interface RootStateTypes {
  test: string,
}

export interface AllStateTypes extends RootStateTypes {
  accountModule: AccountTypes,
}
