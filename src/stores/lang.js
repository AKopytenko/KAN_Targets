import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useLangStore = defineStore('lang', () => {

    const lang = ref('RU')

    function setLang(payload) {

        localStorage.setItem('KTG_LANG', payload)
        lang.value = payload
    }

    return {

        lang,
        setLang
    }
})