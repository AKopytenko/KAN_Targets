<template>
    <div class="ktg-card target">
        <form action="/" @submit.prevent="sendUpdateTarget($event)" class="ktg-card__body target__form">
            <div class="target__header" id="headingOne">
                <h3 class="collapsed p-4 target__name" 
                    :class="{ 'target__name_priority' 
                    : target.priority }" 
                    type="button" 
                    data-toggle="collapse" 
                    :data-target="'#target-' + target.id" 
                    aria-expanded="false" 
                    :aria-controls="'target-' + target.id" 
                    v-if="!updateForm"
                >
                        {{ target.name }}
                </h3>
                <input v-model="target.name" type="text" id="targetUpdateName" class="m-4 form-control target__nameUpdate" v-if="updateForm">
                <a 
                    href="#" 
                    class="target__delete px-4" 
                    data-toggle="modal" 
                    data-target="#deleteTargetModal"
                    @click.prevent="$emit('delete-target-id', target.id)"
                >
                    &times;
                </a>
            </div>
            <div :id="'target-' + target.id" class="collapse target__content" aria-labelledby="headingOne" data-parent="#targetsList">
                <div class="target__body">
                    <div class="target__status" v-if="updateFormMsg">
                        <div 
                            class="alert" 
                            :class="{ 
                                'alert-success': updateFormMsg.success, 
                                'alert-danger': !updateFormMsg.success 
                            }" 
                            v-if="updateFormMsg.success"
                        >
                            {{ updateFormMsg.text }}
                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                    </div>
                    <div class="target__descr">
                        <span class="target__descrText" v-if="!updateForm" v-html="target.descr.split('\n').join('<br>')"></span>
                        <textarea v-model="target.descr" id="targetUpdateDescr" class="form-control target__descrUpdate" v-if="updateForm" rows="6"></textarea>
                    </div>
                    <div class="target__footer mt-4 pt-3">
                        <div class="target__created">Добавлена: {{ new Date(target.created * 1000).toLocaleString() }}</div>
                        
                        <input 
                            class="btn btn-primary target__updateShow" 
                            type="button"
                            value="Редактировать"
                            @click.prevent="showUpdateForm(true)" 
                            v-if="!updateForm"
                        >

                        <input 
                            class="btn btn-light target__updateHide"
                            type="button" 
                            value="Отмена" 
                            @click.prevent="showUpdateForm(false)"
                            v-if="updateForm"
                        >

                        <input 
                            class="btn btn-primary target__updateSave" 
                            type="submit"
                            value="Сохранить"
                            v-if="updateForm"
                        >

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

import $ from 'jquery'

import { mapActions, mapGetters } from 'vuex'

export default {

    name: 'Target',

    props: {

        target: Object
    },

    data() {

        return {

            updateForm: false,
            updateFormMsg: null
        }
    },
    
    computed: {

        ...mapGetters([

            'getTargets', 
            'getUpdateTargetMsg'
        ])
    },

    methods: {

        ...mapActions([

            'updateTarget'
        ]),

        showUpdateForm(mode) {

            this.updateForm = mode
            this.updateFormMsg = null
        },

        sendUpdateTarget($event) {

            const formFields = $event.target.elements

            const formData = {

                id: formFields.targetID.value,
                name: formFields.targetUpdateName.value,
                descr: formFields.targetUpdateDescr.value
            }

            this.updateTarget(formData)
        }
    },

    mounted() {

        const self = this

        $('.target__content').on('hide.bs.collapse', function () {
            
            self.showUpdateForm(false)
        })
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