<template>

    <div id="app">

        <Targets />

    </div>

</template>

<script>

import { mapActions } from 'vuex'
import Targets from './components/Targets.vue'

export default {

    name: 'App',

    components: {

        Targets
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
