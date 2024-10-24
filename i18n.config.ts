import tw from '@/i18n/tw.json'
import en from '@/i18n/en.json'

export default defineI18nConfig(() => ({
    legacy: false,
    locale: 'tw',
    messages: {
        tw,
        en
    }
}))
