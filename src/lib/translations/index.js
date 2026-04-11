import i18n from 'sveltekit-i18n';
import lang from './lang.json';

export const defaultLocale = 'lv'; // Define this explicitly

/** @type {import('sveltekit-i18n').Config} */
const config = ({
    translations: {
    en: { lang },
    lv: { lang },
  },
  loaders: [
    {
      locale: 'en',
      key: 'common',
      loader: async () => (
        await import('./en/common.json')
      ).default,
    },
    {
      locale: 'lv',
      key: 'common',
      loader: async () => (
        await import('./lv/common.json')
      ).default,
    },
  ],
});

export const { t, loading, locales, locale, translations, loadTranslations, addTranslations, setLocale, setRoute } = new i18n(config);