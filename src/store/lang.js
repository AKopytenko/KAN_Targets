import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useLangStore = defineStore('lang', () => {

    const lang = ref('RU')

    const setLang = payload => {

        try {

            localStorage.setItem('KTG_LANG', payload)
            lang.value = payload

        } catch {

            lang.value = 'RU'
        }
    }

    return {

        lang,
        setLang
    }
})