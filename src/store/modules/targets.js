export default {

    state: {
        
        targets: [],

        newTargetMsg: null,
        editTargetMsg: null
    },
    getters: {

        getTargets: state => state.targets,
        newTargetMsg: state => state.newTargetMsg,
        editTargetMsg: state => state.editTargetMsg
    },
    actions: {

        /**
         * Добавляет в приложение задачи из localStorage при заходе или обновлении страницы
         * 
         * @param {Object} state - служебное свойство VueX (текущее состояние хранилища), не передаётся при вызове 
         */
        addTargets ({state}) {
            
            const localTargets = JSON.parse(localStorage.getItem('KTG_LIST'))

            if(localTargets) {
                state.targets = localTargets
            }
        },

        /**
         * Добавляет новую задачу
         * 
         * @param {Object} state      - служебное свойство VueX (текущее состояние хранилища), не передаётся при вызове 
         * @param {Object} targetData - значения полей формы для добавления новой задачи
         */
        addTarget ({state}, targetData) {

            let newTarget = {
                name: targetData.name,
                descr: targetData.descr,
                priority: targetData.priority,
                created: targetData.created
            }

            if(state.targets.length) {
                // Сортировка задач из стейта по ID
                state.targets.sort(function(a, b) {
                    if (a.id > b.id) return 1
                    if (a.id < b.id) return -1
                    return 0
                })
                const lastTarget = state.targets[state.targets.length - 1] // Последний элемент массива
                newTarget.id = Number(lastTarget.id) + 1
            } else {
                newTarget.id = 1
            }
            
            try {
                state.targets.push(newTarget)
                localStorage.setItem('KTG_LIST', JSON.stringify(state.targets))
                state.newTargetMsg = { error: false, success: 'Новая задача успешно добавлена.' }
            } catch {
                state.newTargetMsg = { error: 'Ошибка добавления задачи!', success: false }
            }
        },

        /**
         * Обновляет задачу с указанным ID
         * 
         * @param {Object} state      - служебное свойство VueX (текущее состояние хранилища), не передаётся при вызове 
         * @param {Object} targetData - значения полей формы редактирования задачи
         */
        editTarget({state}, targetData) {

            try {

                state.targets.map( target => {
                    if(target.id == targetData.id) {
                        target.name = targetData.name
                        target.descr = targetData.descr
                    }
                })
                
                localStorage.removeItem('KTG_LIST')
                localStorage.setItem('KTG_LIST', JSON.stringify(state.targets))

                state.editTargetMsg = { success: true, text: 'Задача успешно отредактирована' }

            } catch {

                state.editTargetMsg = { success: false, text: 'Ошибка при попытке редактирования задачи!' }
            }
        },

        /**
         * Удаляет задачу с указанным ID
         * 
         * @param {Object} state - служебное свойство VueX (текущее состояние хранилища), не передаётся при вызове 
         * @param {Number} id    - ID удаляемой задачи
         */
        removeTarget({state}, id) {

            let newTargets = []
            state.targets.map( target => {
                if(target.id !== id) {
                    newTargets.push(target)
                }
            })
            state.targets = newTargets
            localStorage.setItem('KTG_LIST', JSON.stringify(state.targets))
        }
    }
}
