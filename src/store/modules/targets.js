export default {

    state: {
        
        targets: [],
        createTargetMsg: null,
        updateTargetMsg: null,
        deleteTargetMsg: null
    },
    getters: {

        getTargets: state => state.targets,
        getCreateTargetMsg: state => state.createTargetMsg,
        getUpdateTargetMsg: state => state.updateTargetMsg,
        getDeleteTargetMsg: state => state.deleteTargetMsg
    },
    actions: {

        /**
         * [CREATE] Добавляет новую задачу
         * 
         * @param {Object} state      - служебное свойство VueX (текущее состояние хранилища), не передаётся при вызове 
         * @param {Object} targetData - значения полей формы для добавления новой задачи
         */
        createTarget ({state}, targetData) {

            let createTarget = {
                name: targetData.name,
                descr: targetData.descr,
                priority: targetData.priority,
                created: targetData.created
            }

            if(state.targets.length) {
                state.targets.sort(function(a, b) {
                    if (a.id > b.id) return 1
                    if (a.id < b.id) return -1
                    return 0
                })
                const lastTarget = state.targets[state.targets.length - 1] // Последний элемент массива
                createTarget.id = Number(lastTarget.id) + 1
            } else {
                createTarget.id = 1
            }
            
            try {
                state.targets.push(createTarget)
                localStorage.setItem('KTG_LIST', JSON.stringify(state.targets))
                state.createTargetMsg = { error: false, success: 'Новая задача успешно добавлена.' }
            } catch {
                state.createTargetMsg = { error: 'Ошибка добавления задачи!', success: false }
            }
        },

        /**
         * [READ] Добавляет в приложение задачи из localStorage при заходе или обновлении страницы
         * 
         * @param {Object} state - служебное свойство VueX (текущее состояние хранилища), не передаётся при вызове 
         */
        readTargets ({state}) {
            
            const localTargets = JSON.parse(localStorage.getItem('KTG_LIST'))

            if(localTargets) {
                state.targets = localTargets
            }
        },

        /**
         * [UPDATE] Обновляет задачу с указанным ID
         * 
         * @param {Object} state      - служебное свойство VueX (текущее состояние хранилища), не передаётся при вызове 
         * @param {Object} targetData - значения полей формы редактирования задачи
         */
        updateTarget({state}, targetData) {

            try {

                state.targets.map( target => {
                    if(target.id == targetData.id) {
                        target.name = targetData.name
                        target.descr = targetData.descr
                    }
                })
                
                localStorage.removeItem('KTG_LIST')
                localStorage.setItem('KTG_LIST', JSON.stringify(state.targets))

                state.updateTargetMsg = { success: true, text: 'Задача успешно отредактирована', id: targetData.id }

            } catch {

                state.updateTargetMsg = { success: false, text: 'Ошибка при попытке редактирования задачи!', id: targetData.id }
            }
        },

        /**
         * [DELETE] Удаляет задачу с указанным ID
         * 
         * @param {Object} state - служебное свойство VueX (текущее состояние хранилища), не передаётся при вызове 
         * @param {Number} id    - ID удаляемой задачи
         */
        deleteTarget({state}, id) {

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
