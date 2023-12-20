<template>
    <div id="app">
        <KTGTargets />
    </div>
</template>

<script>
import { useStore } from 'vuex'
import KTGTargets from './components/KTGTargets.vue'

export default {

    name: 'App',

    components: {

        KTGTargets
    },

    setup() {

        const store = useStore()

        const localLang = localStorage.getItem('KTG_LANG')

        const setLang = lang => store.dispatch('setLang', lang)

        if(localLang) {

            setLang(localLang)
        }
    }
}
</script>

<style lang="scss">
@import '@/assets/styles/scss/layout.scss';
</style>