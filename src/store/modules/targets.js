export default {

    state: {
        
        targets: [],
        newTargetMsg: null
    },
    getters: {

        getTargets: state => state.targets,
        newTargetMsg: state => state.newTargetMsg
    },
    actions: {

        addTargets ({state}) {
            
            const localTargets = JSON.parse(localStorage.getItem('KTG_LIST'))

            if(localTargets) {
                state.targets = localTargets
            }
        },

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
        }
    }
}
