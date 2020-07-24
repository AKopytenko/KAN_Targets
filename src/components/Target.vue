<template>
    <form action="/" @submit.prevent="sendEditTarget($event)">
        <div class="card-header target__header" id="headingOne">
            <h3 class="target__name collapsed" 
                :class="{ 'target__name_priority' 
                : target.priority }" 
                type="button" 
                data-toggle="collapse" 
                :data-target="'#target-' + target.created" 
                aria-expanded="false" 
                :aria-controls="'target-' + target.created" 
                v-if="!editForm">
                    {{ target.name }}
            </h3>
            <input v-model="target.name" type="text" id="targetEditName" class="form-control target__nameEdit" v-if="editForm">
            <a href="#" class="target__remove ml-3" @click.prevent="removeTarget(target.id)">&times;</a>
        </div>
        <div :id="'target-' + target.created" class="collapse target__content" aria-labelledby="headingOne" data-parent="#targetsList">
            <div class="card-body target__body">
                <div class="target__status" v-if="editFormMsg">
                    <div 
                        class="alert" 
                        :class="{ 
                            'alert-success': editFormMsg.success, 
                            'alert-danger': !editFormMsg.success 
                        }" 
                        v-if="editFormMsg.success"
                    >
                        {{ editFormMsg.text }}
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                </div>
                <div class="target__descr">
                    <span class="target__descrText" v-if="!editForm">{{ target.descr }}</span>
                    <textarea v-model="target.descr" id="targetEditDescr" class="form-control target__descrEdit" v-if="editForm" rows="6"></textarea>
                </div>
                <div class="target__footer mt-4 pt-3">
                    <div class="target__created">Добавлена: {{ new Date(target.created * 1000).toLocaleString() }}</div>
                    
                    <input 
                        class="btn btn-primary target__editShow" 
                        type="button"
                        value="Редактировать"
                        @click.prevent="showEditForm(true)" 
                        v-if="!editForm"
                    >

                    <input 
                        class="btn btn-light target__editHide"
                        type="button" 
                        value="Отмена" 
                        @click.prevent="showEditForm(false)"
                        v-if="editForm"
                    >

                    <input 
                        class="btn btn-primary target__editSave" 
                        type="submit"
                        value="Сохранить"
                        v-if="editForm"
                    >

                </div>
            </div>
        </div>
    </form>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
    name: 'Target',
    props: {
        target: Object
    },
    computed: {

        ...mapGetters(['editTargetMsg'])
    },
    data() {
        return {
            editForm: false,
            editFormMsg: null
        }
    },
    methods: {

        ...mapActions(['editTarget', 'removeTarget']),

        showEditForm(mode) {

            this.editForm = mode
            this.editFormMsg = null
        },

        sendEditTarget($event) {

            const formFields = $event.target.elements
            const formData = {
                id: this.target.id,
                name: formFields.targetEditName.value,
                descr: formFields.targetEditDescr.value
            }

            this.editTarget(formData)
        }
    },
    watch: {

        editTargetMsg(msg) {

            if(msg.id == this.target.id) {

                this.editFormMsg = msg

                if(msg.success) {
                    this.editForm = false
                }
            }
        }
    }
}
</script>

<style lang="scss">
@import '@/assets/styles/scss/components/Target.scss';
</style>