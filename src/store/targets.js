import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useTranslaterStore } from '@/store/translater'

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

        if(this.targets.length) {

            this.targets.sort((a, b) => {
                if (a.id > b.id) return 1
                if (a.id < b.id) return -1
                return 0
            })

            const lastTarget = this.targets[this.targets.length - 1] // Последний элемент массива
            createTarget.id = Number(lastTarget.id) + 1

        } else {

            createTarget.id = 1
        }

        try {

            this.targets.push(createTarget)

            localStorage.setItem('KTG_LIST', JSON.stringify(this.targets))

            createTargetMsg.value = { success: true, text: translater.getTranslate.TARGET_NEW_SUCCESS }

        } catch {

            createTargetMsg.value = { success: false, text: translater.getTranslate.ERROR_TARGET_ADD }
        }
    }

    const readTargets = () => {

        return localStorage.getItem('KTG_TARGETS')
    }

    const updateTarget = data => {

        try {

            this.targets.map( target => {

                if(target.id == data.id) {

                    target.name         = data.name
                    target.descr        = data.descr
                    target.priority     = data.priority
                    target.completed    = data.completed
                }
            })

            localStorage.removeItem('KTG_LIST')
            localStorage.setItem('KTG_LIST', JSON.stringify(this.targets))

            updateTargetMsg = { success: true, text: translater.getTranslate.TARGET_UPDATE_SUCCESS, id: data.id }

        } catch {

            updateTargetMsg = { success: false, text: translater.getTranslate.ERROR_TARGET_EDIT, id: data.id }
        }
    }

    const deleteTarget = () => {


    }

    // Getter
    // const doubleCount = computed(() => count.value * 2)

    // Action
    // const increment = num => count.value = num

    return { 

        targets, 
        targetsMsg, 
        createTargetMsg, 
        updateTargetMsg, 
        deleteTargetMsg,

        createTarget,
        readTargets,
        updateTarget,
        deleteTarget
    }
})
