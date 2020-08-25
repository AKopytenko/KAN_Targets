<template>
    <div class="ktg-targets">
        
        <div class="container ktg-targets__container">
            
            <div class="ktg-targets__header my-4 pb-4">
                <div class="row align-items-center">
                    <div class="col-12 col-sm-6">
                        <div class="ktg-targets__headerLogo">KAN-Targets</div>
                    </div>
                    <div class="col-12 col-sm-6">
                        <CreateTarget />
                    </div>
                </div>
            </div>

            <div class="ktg-targets__list my-4" v-if="getTargets.length">
                <div class="accordion ktg-targets__accordion" id="targetsList">
                    <div class="card ktg-target__card " v-for="target in getTargets" :key="target.created">
                        <Target 
                            :target="target"
                            @delete-target-id="setDeleteTargetID($event)" 
                        />
                    </div>
                </div>
            </div>

            <div class="ktg-targets__empty my-4" v-if="!getTargets.length">
                Список задач пуст...
            </div>

            <ImportTargets v-if="getTargets" />

        </div>

        <div class="modal fade" id="deleteTargetModal" tabindex="-1" aria-labelledby="deleteTargetModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="deleteTargetModalLabel">Удаление задачи</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        Выбранная задача будет удалена без возможности восстановления.
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-light" data-dismiss="modal">Отмена</button>
                        <button type="button" class="btn btn-danger" data-dismiss="modal" @click="deleteTarget(deleteTargetID)">УДАЛИТЬ</button>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>

import 'jquery'
import 'bootstrap'

import { mapGetters, mapActions } from 'vuex'

import Target           from './Target'
import CreateTarget     from './CreateTarget'
import ImportTargets    from './ImportTargets'

export default {
    name: 'Targets',
    data() {

        return {
            
            deleteTargetID: null
        }
    },
    components: {

        Target,
        CreateTarget,
        ImportTargets
    },
    computed: {

        ...mapGetters([

            'getTargets'
        ])
    },
    methods: {

        ...mapActions([

            'readTargets', 
            'deleteTarget'
        ]),

        setDeleteTargetID(id) {

            this.deleteTargetID = id
        }
    },
    mounted() {

        this.readTargets()
    }
}
</script>

<style lang="scss">
@import '~bootstrap/dist/css/bootstrap.min.css';
@import '~@fortawesome/fontawesome-free/css/all.min.css';
@import '@/assets/styles/layout.scss';
</style>
