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
                        <div class="card-header target__header" id="headingOne">
                            <h3 class="target__name collapsed" :class="{ 'target__name_priority' : target.priority }" type="button" data-toggle="collapse" :data-target="'#target-' + target.created" aria-expanded="false" :aria-controls="'target-' + target.created">
                                {{ target.name }}
                            </h3>
                        </div>
                        <div :id="'target-' + target.created" class="collapse target__content" aria-labelledby="headingOne" data-parent="#targetsList">
                            <div class="card-body target__body">
                                <div class="target__text">{{ target.descr }}</div>
                                <hr>
                                <div class="target_created">Добавлена: {{ new Date(target.created * 1000).toLocaleString() }}</div>
                            </div>
                        </div>
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

import NewTarget from './NewTarget'

export default {
    name: 'Targets',
    components: {

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
