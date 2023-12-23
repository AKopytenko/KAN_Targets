<template>
    <select id="KTGLang" class="form-select ktg-lang" @change="setLang($event.target.value)" :value="lang">
        <option value="RU">RU</option>
        <option value="EN">EN</option>
    </select>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {

    name: 'KTGLang',

    setup() {

        const store = useStore()

        const lang = computed(() => store.state.lang.lang)
        const setLang = data => store.dispatch('setLang', data)

        return {

            lang,
            setLang
        }
    }
}
</script>

<style lang="scss">
@import '@/assets/styles/scss/components/lang';
</style>