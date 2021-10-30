<template>
    <div class="ktg-createTarget">

        <a href="#" class="btn btn-primary mt-4 mt-sm-0 ktg-createTarget__btnModal" data-bs-toggle="modal" data-bs-target="#createTargetModal" aria-hidden="true">Новая задача</a>
        
        <div class="modal fade ktg-createTarget__modalAdd" tabindex="-1" role="dialog" id="createTargetModal" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Новая задача</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <form class="ktg-createTarget__form" action="/" method="post" @submit.prevent="sendTargetForm($event)" id="createTargetForm">
                        <div class="modal-body">
                            <div class="mb-3 ktg-createTarget__result" v-if="createTargetFormMsg">
                                <div class="alert alert-success" v-if="createTargetFormMsg.success">{{ createTargetFormMsg.success }}</div>
                                <div class="alert alert-danger" v-if="createTargetFormMsg.error">{{ createTargetFormMsg.error }}</div>
                            </div>
                            <div class="ktg-createTarget__error" v-if="formErrors.length">
                                <div class="alert alert-danger">
                                    <div v-for="error in formErrors" :key="error">
                                        {{ error }}
                                    </div>
                                </div>
                            </div>
                            <div class="mb-3 ktg-createTarget__form-group">
                                <label for="targetName">Название</label>
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
                                <label for="targetDescr">Описание</label>
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
                                <label class="form-check-label" for="targetPriority">Приоритетная задача</label>
                            </div>
                        </div>
                        <div class="modal-footer ktg-createTarget__btns">
                            <button type="button" class="btn btn-light" data-bs-dismiss="modal">Отмена</button>
                            <button type="submit" class="btn btn-primary">Добавить</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    </div>
</template>

<script>

import { mapGetters, mapActions } from 'vuex'

export default {

    name: 'CreateTarget.vue',

    data() {

        return {

            invalidFields: {},
            formErrors: [],

            modalShow: false,
            createTargetFormMsg: null
        }
    },
    computed: {

        ...mapGetters([

            'getTargets', 
            'getCreateTargetMsg'
        ])
    },
    methods: {

        ...mapActions([

            'createTarget'
        ]),

        sendTargetForm(event) {

            const fields = event.target.elements

            this.invalidFields = {}
            this.formErrors = []

            let data = {}

            if(fields.targetName.value) {

                data.name = fields.targetName.value

            } else {

                this.invalidFields.targetName = true
                this.formErrors.push('Введите название задачи')
            }

            if(fields.targetDescr.value) {

                data.descr = fields.targetDescr.value

            } else {

                this.invalidFields.targetDescr = true
                this.formErrors.push('Введите текст задачи')
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

        this.createTargetFormMsg = null
    },
    watch: {

        getCreateTargetMsg(msg) {

            this.createTargetFormMsg = msg

            if('success' in msg) {

                document.querySelector('#createTargetForm').reset()
            }
        }
    }
}
</script>
