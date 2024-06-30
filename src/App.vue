<template>
    <div id="app">
        <KTGTargets />
    </div>
</template>

<script setup>
import { useLangStore } from '@/stores/lang'
import KTGTargets from './components/KTGTargets.vue'

const langStore = useLangStore()

const localLang = localStorage.getItem('KTG_LANG')

if(localLang) {

    langStore.setLang(localLang)
}

</script>

<style lang="scss">
@import '@/assets/styles/scss/layout.scss';
</style>