<template>

    <div 
        class="ktg-card target"
        :class="{ 'target__completed' : target.completed }"
    >

        <form action="/" @submit.prevent="sendUpdateTarget()" class="ktg-card__body target__form">

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

                <input v-model="targetName" type="text" id="targetUpdateName" class="m-4 form-control target__nameUpdate" v-if="updateForm">
                
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

                    <template v-if="'success' in updateTargetMsg && updateTargetMsg.id == target.id">
                        <div 
                            class="alert alert-dismissible target__message"  
                            :class="{ 
                                'alert-success': updateTargetMsg.success, 
                                'alert-danger': !updateTargetMsg.success 
                            }"
                        >
                            {{ updateTargetMsg.text }}
                            <button type="button" class="btn-close target__messageClose" @click="setUpdateTargetMsg({})"></button>
                        </div>
                    </template>

                    <div class="form-group target__descr">
                        <span class="target__descrText" v-if="!updateForm" v-html="target.descr.split('\n').join('<br>')"></span>
                        <textarea v-model="targetDescr" id="targetUpdateDescr" class="form-control target__descrUpdate" v-if="updateForm" rows="6"></textarea>
                    </div>

                    <div class="form-group form-check target__state my-4" v-if="updateForm">
                        <input type="checkbox" v-model="targetPriority" id="targetUpdatePriority" class="form-check-input target__priorityUpdate">
                        <label class="form-check-label" for="targetUpdatePriority">{{ getTranslate.TARGET_PRIORITY }}</label>
                    </div>

                    <div class="form-group form-check target__state my-4" v-if="updateForm">
                        <input type="checkbox" v-model="targetCompleted" id="targetUpdateState" class="form-check-input target__stateUpdate">
                        <label class="form-check-label" for="targetUpdateState">{{ getTranslate.TARGET_CLOSED }}</label>
                    </div>

                    <div class="target__footer mt-4 pt-3">

                        <div class="target__created">{{ getTranslate.TARGET_DATE }}: {{ new Date(target.created * 1000).toLocaleString() }}</div>

                        <button 
                            class="btn btn-primary target__updateShow" 
                            type="button"
                            @click.prevent="updateForm = true" 
                            v-if="!updateForm"
                        >{{ getTranslate.BTN_EDIT }}</button>

                        <button 
                            class="btn btn-light target__updateHide"
                            type="button" 
                            @click.prevent="updateForm = false"
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
import { computed, ref, watch } from 'vue'
import { useStore } from 'vuex'

export default {

    name: 'KTGTarget',

    props: {

        target: {

            type: Object,
            require: true
        }
    },

    setup(props) {

        const store = useStore()

        const updateTargetMsg       = computed(() => store.state.targets.updateTargetMsg)
        const getTranslate          = computed(() => store.getters.getTranslate)
        const updateTarget          = data => store.dispatch('updateTarget', data)
        const setUpdateTargetMsg    = msg => store.commit('setUpdateTargetMsg', msg)

        let targetId        = ref(props.target.id),
            targetName      = ref(props.target.name),
            targetDescr     = ref(props.target.descr),
            targetCompleted = ref(props.target.completed),
            targetPriority  = ref(props.target.priority),
            updateForm      = ref(false)

        function sendUpdateTarget() {

            const data = {

                id:         targetId.value,
                name:       targetName.value,
                descr:      targetDescr.value,
                completed:  targetCompleted.value,
                priority:   targetPriority.value
            }

            updateTarget(data)
        }

        watch(updateTargetMsg, async msg => {

            if(msg.success) updateForm.value = false
        })

        return {

            updateTargetMsg,
            getTranslate,
            updateTarget,
            setUpdateTargetMsg,
            targetId,
            targetName,
            targetDescr,
            targetCompleted,
            targetPriority,
            updateForm,
            sendUpdateTarget
        }
    }
}
</script>

<style lang="scss">
@import '@/assets/styles/scss/components/target.scss';
</style>