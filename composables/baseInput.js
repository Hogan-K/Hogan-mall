export default function () {
    const { t } = useI18n()

    const required = (v) => !!v || t('required')
    const email = (v) => /^[\w.-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(v) || t('input_rule_error')
    const cellphone = (v) => /^(09)[0-9]{8}$/.test(v) || t('input_rule_error')
    const address = (v) => /^[\u4e00-\u9fa5A-Za-z0-9\s.,-]{5,100}$/.test(v) || t('input_rule_error')
    const name = (v) => /^[\u4e00-\u9fa5A-Za-z]{1,20}$/.test(v) || t('input_rule_error')
    const creditCardFormat = (v) => /^\d{4}-\d{4}-\d{4}-\d{4}$/.test(v) || t('input_rule_error')
    const cvc = (v) => /^[0-9]{3}$/.test(v) || t('input_rule_error')

    return {
        required,
        email,
        cellphone,
        address,
        name,
        creditCardFormat,
        cvc
    }
}
