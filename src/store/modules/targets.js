export default {

    state: {
        
        targets: []
    },
    getters: {

        getTargets: state => state.targets
    },
    actions: {

        addTargets ({state}) {
            
            const localTargets = JSON.parse(localStorage.getItem('KTG_LIST'))

            console.log( 'ЛОКАЛЬНЫЕ: ', localTargets )

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
            
            state.targets.push(newTarget)

            localStorage.setItem('KTG_LIST', JSON.stringify(state.targets))

            dispatch('addTargets')
        }
    }
}
