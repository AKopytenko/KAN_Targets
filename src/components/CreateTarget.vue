<template>
    <div class="ktg-createTarget">

        <a href="#" class="btn btn-primary mt-4 mt-sm-0 ktg-createTarget__btnModal" data-bs-toggle="modal" data-bs-target="#createTargetModal" aria-hidden="true">{{ getTranslate.BTN_NEW_TASK }}</a>

        <div class="modal fade ktg-createTarget__modalAdd" tabindex="-1" role="dialog" id="createTargetModal" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">{{ getTranslate.TARGET_NEW_HEADER }}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <form class="ktg-createTarget__form" action="/" method="post" @submit.prevent="sendTargetForm($event)" id="createTargetForm">
                        <div class="modal-body">
                            <div class="mb-3 ktg-createTarget__result" v-if="getCreateTargetMsg">
                                <div class="alert alert-success" v-if="getCreateTargetMsg.success">{{ getCreateTargetMsg.text }}</div>
                                <div class="alert alert-danger" v-if="getCreateTargetMsg.error">{{ getCreateTargetMsg.text }}</div>
                            </div>
                            <div class="ktg-createTarget__error" v-if="formErrors.length">
                                <div class="alert alert-danger">
                                    <div v-for="error in formErrors" :key="error">
                                        {{ error }}
                                    </div>
                                </div>
                            </div>
                            <div class="mb-3 ktg-createTarget__form-group">
                                <label for="targetName">{{ getTranslate.TARGET_NEW_NAME }}</label>
                                <input 
                                    type="text" 
                                    class="form-control" 
                                    id="targetName" 
                                    aria-describedby="targetNameHelp"
                                    :class="{ 'is-invalid': 'targetName' in invalidFields }" 
                                    @change="checkValid($event)"
                                >
                            </div>
                            <div class="mb-3 ktg-createTarget__formform-group">
                                <label for="targetDescr">{{ getTranslate.TARGET_NEW_TEXT }}</label>
                                <textarea 
                                    class="form-control" 
                                    id="targetDescr" 
                                    rows="5" 
                                    aria-describedby="targetDescrHelp"
                                    :class="{ 'is-invalid': 'targetDescr' in invalidFields }" 
                                    @change="checkValid($event)"
                                ></textarea>
                            </div>
                            <div class="form-check ktg-createTarget__formform-group">
                                <input type="checkbox" class="form-check-input" id="targetPriority" aria-describedby="targetPriorityHelp">
                                <label class="form-check-label" for="targetPriority">{{ getTranslate.TARGET_NEW_PRIORITY }}</label>
                            </div>
                        </div>
                        <div class="modal-footer ktg-createTarget__btns">
                            <button type="button" class="btn btn-light" data-bs-dismiss="modal">{{ getTranslate.BTN_CANCEL }}</button>
                            <button type="submit" class="btn btn-primary">{{ getTranslate.BTN_ADD }}</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    </div>
</template>

<script>

import { mapGetters, mapActions, mapMutations } from 'vuex'

export default {

    name: 'CreateTarget.vue',

    data() {

        return {

            invalidFields: {},
            formErrors: [],

            modalShow: false
        }
    },

    computed: {

        ...mapGetters([

            'getTranslate',
            'getTargets', 
            'getCreateTargetMsg'
        ])
    },

    methods: {

        ...mapActions([

            'createTarget'
        ]),

        ...mapMutations([

            'setCreateTargetMsg'
        ]),

        sendTargetForm(event) {

            const fields = event.target.elements

            this.invalidFields = {}
            this.formErrors = []
            this.setCreateTargetMsg(null)

            let data = {}

            if(fields.targetName.value) {

                data.name = fields.targetName.value

            } else {

                this.invalidFields.targetName = true
                this.formErrors.push(this.getTranslate.ERROR_TARGET_TITLE)
            }

            if(fields.targetDescr.value) {

                data.descr = fields.targetDescr.value

            } else {

                this.invalidFields.targetDescr = true
                this.formErrors.push(this.getTranslate.ERROR_TARGET_TEXT)
            }

            data.priority = fields.targetPriority.checked

            data.created = (Date.now() / 1000).toFixed()

            if(this.formErrors.length == 0) {

                this.createTarget(data)
            }
        },

        checkValid(event) {

            event.target.classList.remove('is-invalid')
        }
    },

    mounted() {

        const self = this
        const createTargetModal = document.getElementById('createTargetModal')

        createTargetModal.addEventListener('show.bs.modal', function () {

            self.invalidFields = {}
            self.formErrors = []
            self.setCreateTargetMsg(null)
        })
    },

    watch: {

        getCreateTargetMsg(msg) {

            if(msg && msg.success) {

                document.querySelector('#createTargetForm').reset()
            }
        }
    }
}
</script>
