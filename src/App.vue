<template>
    <div id="app">
        <Targets />
    </div>
</template>

<script>
import 'jquery'
import 'bootstrap'

import Targets from './components/Targets.vue'

export default {
    name: 'App',
    components: {
        Targets
    }
}
</script>

<style lang="scss">
@import '~bootstrap/dist/css/bootstrap.min.css';
@import '~@fortawesome/fontawesome-free/css/all.min.css';
</style>