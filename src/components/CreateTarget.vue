<template>
    <div class="ktg-createTarget">
        <a href="#" class="btn btn-primary mt-4 mt-sm-0 ktg-createTarget__btnModal" data-toggle="modal" data-target="#createTargetModal" aria-hidden="true">Новая задача</a>
        <div class="modal fade ktg-createTarget__modalAdd" tabindex="-1" role="dialog" id="createTargetModal">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Новая задача</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <form class="ktg-createTarget__form" action="/" method="post" @submit.prevent="sendTargetForm($event)" id="createTargetForm">
                        <div class="modal-body">
                            <div class="ktg-createTarget__result" v-if="createTargetFormMsg">
                                <div class="alert alert-success" v-if="createTargetFormMsg.success">{{ createTargetFormMsg.success }}</div>
                                <div class="alert alert-danger" v-if="createTargetFormMsg.error">{{ createTargetFormMsg.error }}</div>
                            </div>
                            <div class="form-group">
                                <label for="targetName">Название</label>
                                <input type="text" class="form-control" id="targetName" aria-describedby="targetNameHelp" required>
                            </div>
                            <div class="form-group">
                                <label for="targetDescr">Описание</label>
                                <textarea class="form-control" id="targetDescr" rows="5" aria-describedby="targetDescrHelp" required></textarea>
                            </div>
                            <div class="form-group form-check">
                                <input type="checkbox" class="form-check-input" id="targetPriority" aria-describedby="targetPriorityHelp">
                                <label class="form-check-label" for="targetPriority">Приоритетная задача</label>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Отмена</button>
                            <button type="submit" class="btn btn-primary">Добавить</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import $ from 'jquery'
import { mapGetters, mapActions } from 'vuex'

export default {
    name: 'CreateTarget.vue',
    data() {
        return {
            createTargetFormMsg: null
        }
    },
    computed: {

        ...mapGetters(['getTargets', 'getCreateTargetMsg'])
    },
    methods: {

        ...mapActions(['createTarget']),

        sendTargetForm($event) {

            const targetFormFields = $event.target.elements

            let tardetData = {
                name: targetFormFields.targetName.value,
                descr: targetFormFields.targetDescr.value,
                priority: targetFormFields.targetPriority.checked,
                created: (Date.now() / 1000).toFixed()
            }

            this.createTarget(tardetData)
        }
    },
    mounted() {

        const self = this

        $('#createTargetModal').on('hidden.bs.modal', function() {
            self.createTargetFormMsg = null
        })
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
