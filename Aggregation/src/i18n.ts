import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
// import XHR from 'i18next-xhr-backend'
import LanguageDetector from 'i18next-browser-languagedetector'
//引入需要实现国际化的简体、繁体、英文三种数据的json文件
import cn from './locales/zh-CN.json'
import tw from './locales/zh-TW.json'
import en from './locales/en.json'
import ja from './locales/ja-JP.json'
import ko from './locales/ko-KO.json'
import fr from './locales/fr-FR.json'
import de from './locales/de-DE.json'
import ru from './locales/ru-RU.json'
import es from './locales/es-ES.json'
import pt from './locales/pt-PT.json'
import it from './locales/it-IT.json'

const resources = {
  'zh-CN': {
    translation: cn
  },
  'zh-TW': {
    translation: tw
  },
  'en-US': {
    translation: en
  },
  // 日本
  'ja-JP': {
    translation: ja
  },
  //韩语
  'ko-KO': {
    translation: ko
  },
  //法语
  'fr-FR': {
    translation: fr
  },
  //德语
  'de-DE': {
    translation: de
  },
  //俄语
  'ru-RU': {
    translation: ru
  },
  //西班牙
  'es-ES': {
    translation: es
  },
  //葡萄牙
  'pt-PT': {
    translation: pt
  },
  //意大利
  'it-IT': {
    translation: it
  }
}
export const LangOptions = [
  { label: 'English', value: 'en-US' },
  { label: '简体中文', value: 'zh-CN' },
  { label: '繁体中文', value: 'zh-TW' },
  { label: '日本語', value: 'ja-JP' },
  { label: '한국어', value: 'ko-KO' },
  { label: 'Français', value: 'fr-FR' },
  { label: 'Deutsch', value: 'de-DE' },
  { label: 'русский язык', value: 'de-DE' },
  { label: 'español', value: 'es-ES' },
  { label: 'Português', value: 'pt-PT' },
  { label: 'Italiano', value: 'it-IT' }
]
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
