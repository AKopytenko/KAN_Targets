<template>
    <div class="ktg-targets">
        <div class="container ktg-targets__container">
            <div class="ktg-targets__header my-4">
                <div class="row align-items-center">
                    <div class="col-12 col-sm-6">
                        <div class="ktg-targets__headerLogo">KAN-Targets</div>
                    </div>
                    <div class="col-12 col-sm-6">
                        <NewTarget />
                    </div>
                </div>
            </div>
            <div class="ktg-targets__list my-4" v-if="getTargets">
                <div class="accordion" id="targetsList">
                    <div class="card ktg-targets__card target" v-for="target in getTargets" :key="target.created">
                        <Target :target="target" />
                    </div>
                </div>
            </div>
            <div class="ktg-targets__empty" v-if="!getTargets.length">
                Список задач пуст...
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import Target from './Target'
import NewTarget from './NewTarget'

export default {
    name: 'Targets',
    components: {

        Target,
        NewTarget
    },
    computed: {

        ...mapGetters(['getTargets'])
    },
    methods: {

        ...mapActions(['addTargets'])
    },
    mounted() {

        this.addTargets()
    }
}
</script>

<style lang="scss">
@import '@/assets/styles/layout.scss';
</style>
