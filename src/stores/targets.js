import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useTranslaterStore } from '@/stores/translater'

export const useTargetsStore = defineStore('targets', () => {

    let targets           = ref([]),
        targetsMsg        = ref({}),
        createTargetMsg   = ref({}),
        updateTargetMsg   = ref({}),
        deleteTargetMsg   = ref({})

    const translater = useTranslaterStore()

    /**
     * [CREATE] Добавляет новую задачу
     * 
     * @param {Object} targetData - значения полей формы для добавления новой задачи
     */
    const createTarget = targetData => {

        let createTarget = {

            name:       targetData.name,
            descr:      targetData.descr,
            priority:   targetData.priority,
            created:    targetData.created
        }

        if(targets.value.length) {

            targets.value.sort((a, b) => {
                if (a.id > b.id) return 1
                if (a.id < b.id) return -1
                return 0
            })

            const lastTarget = targets.value[targets.value.length - 1]
            createTarget.id = Number(lastTarget.id) + 1

        } else {

            createTarget.id = 1
        }

        try {

            targets.value.push(createTarget)

            localStorage.setItem('KTG_LIST', JSON.stringify(targets.value))

            createTargetMsg.value = { success: true, text: translater.getTranslate.TARGET_NEW_SUCCESS }

        } catch {

            createTargetMsg.value = { success: false, text: translater.getTranslate.ERROR_TARGET_ADD }
        }
    }

    const setTargets = targets => {

        targets.value = targets
        localStorage.setItem( 'KTG_LIST', JSON.stringify(targets) )
    }

    const readTargets = () => {

        const localTargets = localStorage.getItem('KTG_LIST')

        if(localTargets) {

            targets.value = JSON.parse(localTargets) || []
        }
    }

    const updateTarget = data => {

        try {

            targets.value.map( target => {

                if(target.id == data.id) {

                    target.name         = data.name
                    target.descr        = data.descr
                    target.priority     = data.priority
                    target.completed    = data.completed
                }
            })

            localStorage.removeItem('KTG_LIST')
            localStorage.setItem('KTG_LIST', JSON.stringify(targets.value))

            updateTargetMsg.value = { success: true, text: translater.getTranslate.TARGET_UPDATE_SUCCESS, id: data.id }

        } catch {

            updateTargetMsg.value = { success: false, text: translater.getTranslate.ERROR_TARGET_EDIT, id: data.id }
        }
    }

    const deleteTarget = id => {

        try {

            targets.value = targets.value.filter( target => target.id !== id)
            localStorage.setItem('KTG_LIST', JSON.stringify(targets.value))

            deleteTargetMsg.value = { success: true, text: translater.getTranslate.TARGET_DELETE_SUCCESS }

        } catch {

            deleteTargetMsg.value = { success: false, text: translater.getTranslate.ERROR_TARGET_DELETE }
        }
    }

    const setCreateTargetMsg = data => createTargetMsg.value = data
    const setUpdateTargetMsg = data => updateTargetMsg.value = data
    const setDeleteTargetMsg = data => deleteTargetMsg.value = data

    return { 

        targets, 
        targetsMsg, 
        createTargetMsg, 
        updateTargetMsg, 
        deleteTargetMsg,

        createTarget, 
        setTargets, 
        readTargets,
        updateTarget, 
        deleteTarget,
        setCreateTargetMsg,
        setUpdateTargetMsg,
        setDeleteTargetMsg
    }
})
