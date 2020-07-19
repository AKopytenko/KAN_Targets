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

        addTarget ({state, dispatch}, tardetData) {

            let newTarget = {
                name: tardetData.name,
                descr: tardetData.descr,
                priority: tardetData.priority,
                created: tardetData.created
            }
            
            try {
                state.targets.push(newTarget)
                localStorage.setItem('KTG_LIST', JSON.stringify(state.targets))
                dispatch('addTargets')
                state.newTargetMsg = { error: false, success: 'Новая задача успешно добавлена.' }
            } catch {
                state.newTargetMsg = { error: 'Ошибка добавления задачи!', success: false }
            }
        }
    }
}
