import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
// import XHR from 'i18next-xhr-backend'
import LanguageDetector from 'i18next-browser-languagedetector'
//引入需要实现国际化的简体、繁体、英文三种数据的json文件
import cn from './locales/zh-CN.json'
import tw from './locales/zh-TW.json'
import en from './locales/en.json'
const resources = {
  'zh-CN': {
    translation: cn
  },
  'zh-TW': {
    translation: tw
  },
  'en-US': {
    translation: en
  }
}
i18next
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources, //本地多语言数据
    react: {
      useSuspense: true
    },
    fallbackLng: 'zh-CN', //默认当前环境的语言
    preload: ['zh-CN'],
    keySeparator: false,
    interpolation: { escapeValue: false },
    detection: {
      caches: ['localStorage', 'sessionStorage', 'cookie']
    }
  })

export default i18next
