<template>
    <div class="ktg-targets">

        <div class="container ktg-targets__container">
            
            <div class="ktg-targets__header my-4 pb-4">
                <div class="row align-items-center">
                    <div class="col-8 col-sm-4 col-md-3 col-lg-3 col-xl-2">
                        <div class="ktg-targets__headerLogo">KAN-Targets</div>
                    </div>
                    <div class="col-4 col-sm-3 col-md-5 col-lg-6 col-xl-7">
                        <select id="KTGLang" @change="setLang($event.target.value)" :value="getLang">
                            <option value="RU">RU</option>
                            <option value="EN">EN</option>
                        </select>
                    </div>
                    <div class="col-12 col-sm-5 col-md-4 col-lg-3 col-xl-3">
                        <CreateTarget />
                    </div>
                </div>
            </div>

            <div class="ktg-targets__search">

                <div class="inputWrapper">
                    <input 
                        class="form-control ktg-targets__searchInput inputWrapper__field" 
                        type="text" 
                        placeholder="Поиск задач..." 
                        id="searchTargets" 
                        v-model="inputSearch"
                    >
                    <i class="fas fa-times-circle inputWrapper__icon" v-if="inputSearch.length" @click.prevent="inputSearch = ''"></i>
                </div>
                
                <div class="alert alert-danger mt-4 ktg-targets__searchError" v-if="filteredTargetsEmpty">{{ filteredTargetsEmpty }}</div>
            </div>

            <div class="ktg-targets__list my-4" v-if="targets.length">
                <div class="accordion ktg-targets__accordion" id="targetsList">
                    <template v-for="target in targets">
                        <Target 
                            :target="target"
                            :key="target.id"
                            @delete-target-id="setDeleteTargetID($event)" 
                        />
                    </template>
                </div>
            </div>

            <div class="ktg-targets__empty my-4" v-if="!targets.length">
                {{ getTranslate.TARGETS_EMPTY }}
            </div>

            <ImportTargets v-if="targets" />

        </div>

        <div class="modal fade" id="deleteTargetModal" tabindex="-1" aria-labelledby="deleteTargetModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="deleteTargetModalLabel">{{ getTranslate.TARGET_DELETE_HEADER }}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        {{ getTranslate.TARGET_DELETE_ALERT }}.
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-light" data-bs-dismiss="modal">{{ getTranslate.BTN_CANCEL }}</button>
                        <button type="button" class="btn btn-danger" data-bs-dismiss="modal" @click="deleteTarget(deleteTargetID)">{{ getTranslate.BTN_DELETE }}</button>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>

import 'bootstrap'

import { mapGetters, mapActions } from 'vuex'

import Target           from './Target'
import CreateTarget     from './CreateTarget'
import ImportTargets    from './ImportTargets'

export default {

    name: 'Targets',

    data() {

        return {

            deleteTargetID: null,

            filteredTargets: [],
            filteredTargetsEmpty: null,

            inputSearch: '',
            searchTargetsIcon: false
        }
    },

    components: {

        Target,
        CreateTarget,
        ImportTargets
    },

    computed: {

        ...mapGetters([

            'getTargets',
            'getTranslate',
            'getLang'
        ]),

        targets() {

            if(this.filteredTargets.length) {
                return this.filteredTargets
            } else {
                return this.getTargets
            }
        }
    },

    methods: {

        ...mapActions([

            'readTargets', 
            'deleteTarget',
            'setLang'
        ]),

        filterTargets(input) {

            this.filteredTargets = []
            this.filteredTargetsEmpty = null

            if(input && input.length > 2) {

                if(this.getTargets.length) {

                    for(let target of this.getTargets) {

                        const reg = new RegExp(input.toUpperCase(), 'g')

                        if( reg.test(target.name.toUpperCase()) || reg.test(target.descr.toUpperCase()) ) {

                            this.filteredTargets.push(target)
                        }
                    }

                    if(this.filteredTargets.length == 0) {

                        this.filteredTargets = []
                        this.filteredTargetsEmpty = this.getTranslate.ERROR_SEARCH_EMPTY
                    }
                }
            } else {

                this.filteredTargets = []
                this.filteredTargetsEmpty = null
            }
        },

        setDeleteTargetID(id) {

            this.deleteTargetID = id
        }
    },

    mounted() {

        this.readTargets()
    },

    watch: {

        inputSearch(text) {

            this.filterTargets(text)
        }
    }
}
</script>

<style lang="scss">
@import '~bootstrap/dist/css/bootstrap.min.css';
@import '~@fortawesome/fontawesome-free/css/all.min.css';
@import '@/assets/styles/layout.scss';
</style>
