<template>

    <div 
        class="ktg-card target"
        :class="{ 'target__completed' : target.completed }"
    >

        <form action="/" @submit.prevent="sendUpdateTarget($event.target.elements)" class="ktg-card__body target__form">

            <div class="target__header" id="headingOne">

                <i 
                    class="far fa-check-square ml-4 target__status"
                    :class="{ 'fas' : target.completed }"
                ></i>

                <h3 class="collapsed p-4 target__name" 
                    :class="{ 'target__name_priority' : target.priority }" 
                    type="button" 
                    data-bs-toggle="collapse"
                    aria-expanded="false" 
                    :data-bs-target="'#target-' + target.id" 
                    :aria-controls="'target-' + target.id" 
                    v-if="!updateForm"
                >
                        {{ target.name }}
                </h3>

                <input v-model="target.name" type="text" id="targetUpdateName" class="m-4 form-control target__nameUpdate" v-if="updateForm">
                
                <a 
                    href="#" 
                    class="target__delete" 
                    data-bs-toggle="modal" 
                    data-bs-target="#deleteTargetModal"
                    @click.prevent="$emit('delete-target-id', target.id)"
                >
                    &times;
                </a>

            </div>

            <div :id="'target-' + target.id" class="collapse target__content" data-bs-parent="#targetsList">

                <div class="target__body">

                    <template v-if="updateTargetMsg && updateTargetMsg.id == target.id">
                        <div 
                            class="alert alert-dismissible target__message"  
                            :class="{ 
                                'alert-success': updateTargetMsg.success, 
                                'alert-danger': !updateTargetMsg.success 
                            }"
                        >
                            {{ updateTargetMsg.text }}
                            <button type="button" class="btn-close target__messageClose" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>
                    </template>

                    <div class="form-group target__descr">
                        <span class="target__descrText" v-if="!updateForm" v-html="target.descr.split('\n').join('<br>')"></span>
                        <textarea v-model="target.descr" id="targetUpdateDescr" class="form-control target__descrUpdate" v-if="updateForm" rows="6"></textarea>
                    </div>

                    <div class="form-group form-check target__state my-4" v-if="updateForm">
                        <input type="checkbox" :checked="target.completed" id="targetUpdateState" class="form-check-input target__stateUpdate">
                        <label class="form-check-label" for="targetUpdateState">{{ getTranslate.TARGET_CLOSED }}</label>
                    </div>

                    <div class="target__footer mt-4 pt-3">

                        <div class="target__created">{{ getTranslate.TARGET_DATE }}: {{ new Date(target.created * 1000).toLocaleString() }}</div>
                        
                        <button 
                            class="btn btn-primary target__updateShow" 
                            type="button"
                            @click.prevent="showUpdateForm(true)" 
                            v-if="!updateForm"
                        >{{ getTranslate.BTN_EDIT }}</button>

                        <button 
                            class="btn btn-light target__updateHide"
                            type="button" 
                            @click.prevent="showUpdateForm(false)"
                            v-if="updateForm"
                        >{{ getTranslate.BTN_CANCEL }}</button>

                        <button 
                            class="btn btn-primary target__updateSave" 
                            type="submit"
                            v-if="updateForm"
                        >{{ getTranslate.BTN_SAVE }}</button>

                        <input 
                            type="hidden" 
                            id="targetID" 
                            :value="target.id"
                            v-if="updateForm"
                        >

                    </div>

                </div>

            </div>

        </form>

    </div>

</template>

<script>
import { mapActions, mapGetters, mapMutations, mapState } from 'vuex'

export default {

    name: 'Target',

    props: {

        target: {

            required: true,
            type: Object
        }
    },

    data() {

        return {

            updateForm: false,
            updateFormMsg: null
        }
    },
    
    computed: {

        ...mapState({

            updateTargetMsg: state => state.targets.updateTargetMsg
        }),

        ...mapGetters([

            'getTranslate',
            'getTargets'
        ])
    },

    methods: {

        ...mapActions([

            'updateTarget'
        ]),

        ...mapMutations([

            'setUpdateTargetMsg'
        ]),

        showUpdateForm(mode) {

            this.updateForm = mode
            this.updateFormMsg = null
        },

        sendUpdateTarget(fields) {

            const data = {

                id:         fields.targetID.value,
                name:       fields.targetUpdateName.value,
                descr:      fields.targetUpdateDescr.value,
                completed:  fields.targetUpdateState.checked
            }

            this.updateTarget(data)
        }
    },

    mounted() {

        const self = this
        const targetsTabs = document.getElementsByClassName('target__content')

        self.showUpdateForm(false)

        for(let tab of targetsTabs) {

            tab.addEventListener('hide.bs.collapse', function () {

                self.showUpdateForm(false)
                self.setUpdateTargetMsg(null)
            })
        }
    },

    watch: {

        getUpdateTargetMsg(msg) {

            if(msg.id == this.target.id) {

                this.updateFormMsg = msg

                if(msg.success) {

                    this.updateForm = false
                }
            }
        }
    }
}
</script>

<style lang="scss">
@import '@/assets/styles/scss/components/Target.scss';
</style>