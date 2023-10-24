<template>

    <div id="app">

        <KTGTargets />

    </div>

</template>

<script>
import { mapActions } from 'vuex'
import KTGTargets from './components/KTGTargets.vue'

export default {

    name: 'App',

    components: {

        KTGTargets
    },

    methods: {

        ...mapActions([

            'setLang'
        ])
    },

    mounted() {

        const appLang = localStorage.getItem('KTG_LANG')

        if(appLang) {

            this.setLang(appLang)
        }
    }
}
</script>

<style lang="scss">
@import '@/assets/styles/scss/layout.scss';
</style>