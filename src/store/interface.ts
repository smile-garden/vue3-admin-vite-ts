import { AccountTypes } from '@/store/modules/account/interface';
import { SystemTypes } from '@/store/modules/system/interface';

export interface RootStateTypes {
  test: string,
}

export interface AllStateTypes extends RootStateTypes {
  accountModule: AccountTypes,
  systemModule: SystemTypes,
}
