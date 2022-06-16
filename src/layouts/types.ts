import type { VNode } from 'vue';

export interface MetaInt {
  title: string,
  icon: string | VNode,
  hidden?: boolean,
}

export interface MenuItemInt {
  path: string,
  name: string,
  meta?: MetaInt,
  children?: MenuItemInt[],
}
