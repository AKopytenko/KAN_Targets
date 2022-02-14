<template>
    <select id="KTGLang" class="form-select ktg-lang" @change="setLang($event.target.value)" :value="lang">
        <option value="RU">RU</option>
        <option value="EN">EN</option>
    </select>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {

    name: 'KTGLang',

    computed: {

        ...mapState({

            lang: state => state.lang.lang
        })
    },

    methods: {

        ...mapActions([

            'setLang'
        ])
    }
}
</script>

<style lang="scss">
@import '@/assets/styles/scss/components/KTGLang';
</style>