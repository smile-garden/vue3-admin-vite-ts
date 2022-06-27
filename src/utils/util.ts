import i18n from '@/locales';

/**
 * 设置页面标题
 * @param { string } title
 */
export function setDocumentTitle(title: string) {
  const text = title ? i18n.global.t(`menu.${title}`) : 'Vue3 Admin System';
  document.title = text;
}
