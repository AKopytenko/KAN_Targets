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
                v-if="!showEditForm">
                    {{ target.name }}
            </h3>
            <input v-model="target.name" type="text" id="targetEditName" class="form-control target__nameEdit" v-if="showEditForm">
            <a href="#" class="target__remove ml-3" @click.prevent="removeTarget(target.id)">&times;</a>
        </div>
        <div :id="'target-' + target.created" class="collapse target__content" aria-labelledby="headingOne" data-parent="#targetsList">
            <div class="card-body target__body">
                <div class="target__status" v-if="editTargetMsg">
                    <div class="alert alert-success" v-if="editTargetMsg.success">{{ editTargetMsg.text }}</div>
                    <div class="alert alert-danger" v-if="!editTargetMsg.success">{{ editTargetMsg.text }}</div>
                </div>
                <div class="target__descr">
                    <span class="target__descrText" v-if="!showEditForm">{{ target.descr }}</span>
                    <textarea v-model="target.descr" id="targetEditDescr" class="form-control target__descrEdit" v-if="showEditForm" rows="6"></textarea>
                </div>
                <div class="target__footer mt-4 pt-3">
                    <div class="target__created">Добавлена: {{ new Date(target.created * 1000).toLocaleString() }}</div>
                    
                    <input 
                        class="btn btn-primary target__editShow" 
                        type="button"
                        @click.prevent="showEditForm = true" 
                        v-if="!showEditForm"
                        value="Редактировать"
                    >

                    <input 
                        class="btn btn-light target__editHide"
                        type="button" 
                        @click.prevent="showEditForm = false"
                        v-if="showEditForm"
                        value="Отмена" 
                    >

                    <input 
                        class="btn btn-primary target__editSave" 
                        type="submit"
                        v-if="showEditForm"
                        value="Сохранить"
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
            showEditForm: false
        }
    },
    methods: {

        ...mapActions(['editTarget', 'removeTarget']),

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

            if(msg.success) {

                this.showEditForm = false
            }
        }
    }
}
</script>

<style lang="scss">
@import '@/assets/styles/scss/components/Target.scss';
</style>