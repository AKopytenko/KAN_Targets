export default {

    state: {

        lang: 'RU'
    },

    getters: {

        getLang: state => state.lang
    },

    actions: {

        setLang({state}, payload) {

            try {

                localStorage.setItem('KTG_LANG', payload)
                state.lang = payload

                // Установка языка страницы | Set page language
                // TODO: Определить актуальна ли программная установка html lang для плагинов перевода и поисковых ботов
                document.getElementsByTagName('html')[0].setAttribute('lang', payload.toLowerCase())

            } catch {

                state.lang = 'RU'
            }
        }
    }
}