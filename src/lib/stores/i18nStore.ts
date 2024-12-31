import { writable } from 'svelte/store';
import { translations } from '../i18n/translations';

type Language = 'zh' | 'en';

function createI18nStore() {
  const { subscribe, set } = writable<Language>('zh');
  
  return {
    subscribe,
    setLanguage: (lang: Language) => {
      localStorage.setItem('language', lang);
      set(lang);
    },
    init: () => {
      const savedLang = localStorage.getItem('language') as Language;
      if (savedLang) {
        set(savedLang);
      }
    }
  };
}

export const language = createI18nStore();

// 翻译助手函数
export function t(key: string, lang: Language = 'zh'): string {
  const keys = key.split('.');
  let value = translations[lang];
  
  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = value[k];
    } else {
      return key;
    }
  }
  
  return value as string;
} 
