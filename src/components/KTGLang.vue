<template>
    <select id="KTGLang" class="form-select ktg-lang" @change="setLang($event.target.value)" :value="lang">
        <option value="RU">RU</option>
        <option value="EN">EN</option>
    </select>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

const lang = computed(() => store.state.lang.lang)
const setLang = data => store.dispatch('setLang', data)

</script>

<style lang="scss">
@import '@/assets/styles/scss/components/lang';
</style>