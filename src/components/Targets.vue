<template>
    <div class="ktg-targets">
        <div class="container ktg-targets__container">
            <div class="ktg-targets__control my-4">
                <div class="row align-items-center">
                    <div class="col-12 col-sm-6">KAN-Targets</div>
                    <div class="col-12 col-sm-6">
                        <NewTarget />
                    </div>
                </div>
            </div>
            <div class="ktg-targets__list my-4" v-if="getTargets">
                <div class="accordion" id="targetsList">
                    <div class="card ktg-targets__card" v-for="target in getTargets" :key="target.created">
                        <div class="card-header ktg-targets__cardHeader" id="headingOne">
                            <h3 class="ktg-targets__cardTitle collapsed" type="button" data-toggle="collapse" :data-target="'#target-' + target.created" aria-expanded="false" :aria-controls="'target-' + target.created">
                                {{ target.name }}
                            </h3>
                        </div>
                        <div :id="'target-' + target.created" class="collapse ktg-targets__cardContent" aria-labelledby="headingOne" data-parent="#targetsList">
                            <div class="card-body ktg-targets__cardBody">
                                <div class="target__name">{{ target.descr }}</div>
                                <hr>
                                <div class="target_created">Добавлена: {{ new Date(target.created * 1000).toLocaleString() }}</div>
                            </div>
                        </div>
                    </div>
                    <div class="card ktg-targets__card">
                        <div class="card-header ktg-targets__cardHeader" id="headingTwo">
                            <h3 class="ktg-targets__cardTitle collapsed" type="button" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                Задача номер два
                            </h3>
                        </div>
                        <div id="collapseTwo" class="collapse ktg-targets__cardContent" aria-labelledby="headingTwo" data-parent="#targetsList">
                            <div class="card-body ktg-targets__cardBody">
                                Описание задачи номер два для примера. Описание задачи номер два для примера. Описание задачи номер два для примера. Описание задачи номер два для примера. Описание задачи номер два для примера. Описание задачи номер два для примера. Описание задачи номер два для примера. Описание задачи номер два для примера. Описание задачи номер два для примера. Описание задачи номер два для примера. Описание задачи номер два для примера. Описание задачи номер два для примера. Описание задачи номер два для примера. Описание задачи номер два для примера. 
                            </div>
                        </div>
                    </div>
                </div>
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
// import '../../node_modules/leaflet/dist/leaflet.css';
</style>
