import { en } from './en';
import { ta } from './ta';

export function getTranslation(lang?: string) {
  if (lang === 'ta') {
    return ta;
  }
  return en;
}
export type TranslationType = typeof en;
