<template>
    <div class="ktg-newTarget">
        <a href="#" class="btn btn-primary mt-4 mt-sm-0 ktg-newTarget__btnModal" data-toggle="modal" data-target="#newTargetModalAdd" aria-hidden="true">Новая цель</a>
        <div class="modal fade ktg-newTarget__modalAdd" tabindex="-1" role="dialog" id="newTargetModalAdd">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Новая задача</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <form class="ktg-newTarget__form" action="/" method="post" @submit.prevent="sendTargetForm($event)" id="newTargetForm">
                        <div class="modal-body">
                            <div class="ktg-newTarget__result" v-if="newTargetFormMsg">
                                <div class="alert alert-success" v-if="newTargetFormMsg.success">{{ newTargetFormMsg.success }}</div>
                                <div class="alert alert-danger" v-if="newTargetFormMsg.error">{{ newTargetFormMsg.error }}</div>
                            </div>
                            <div class="form-group">
                                <label for="targetName">Название</label>
                                <input type="text" class="form-control" id="targetName" aria-describedby="targetNameHelp" required>
                            </div>
                            <div class="form-group">
                                <label for="targetDescr">Описание</label>
                                <textarea class="form-control" id="targetDescr" aria-describedby="targetDescrHelp" required></textarea>
                            </div>
                            <div class="form-group form-check">
                                <input type="checkbox" class="form-check-input" id="targetPriority" aria-describedby="targetPriorityHelp">
                                <label class="form-check-label" for="targetPriority">Приоритетная цель</label>
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
    name: 'NewTarget.vue',
    data() {
        return {
            newTargetFormMsg: null
        }
    },
    computed: {

        ...mapGetters(['getTargets', 'newTargetMsg'])
    },
    methods: {

        ...mapActions(['addTarget', 'addTarget']),

        sendTargetForm($event) {

            const targetFormFields = $event.target.elements

            let tardetData = {
                name: targetFormFields.targetName.value,
                descr: targetFormFields.targetDescr.value,
                priority: targetFormFields.targetPriority.checked,
                created: (Date.now() / 1000).toFixed()
            }

            this.addTarget(tardetData)
        }
    },
    mounted() {

        const self = this

        $('#newTargetModalAdd').on('hidden.bs.modal', function() {
            self.newTargetFormMsg = null
        })
    },
    watch: {

        newTargetMsg(msg) {
            this.newTargetFormMsg = msg
            if('success' in msg) {
                document.querySelector('#newTargetForm').reset()
            }
        }
    }
}
</script>
