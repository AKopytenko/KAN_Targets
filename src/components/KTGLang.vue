<template>
    <select id="KTGLang" class="form-select ktg-lang" @change="setLang($event.target.value)" :value="lang">
        <option value="RU">RU</option>
        <option value="EN">EN</option>
    </select>
</template>

<script setup>
import { useLangStore } from '@/stores/lang'

const langStore = useLangStore()

const lang = langStore.lang
const setLang = data => langStore.setLang(data)

</script>

<style lang="scss">
@import '@/assets/styles/scss/components/lang';
</style>