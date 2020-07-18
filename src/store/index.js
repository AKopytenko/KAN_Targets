import Vue from 'vue'
import Vuex from 'vuex'

import targets from './modules/targets'

Vue.use(Vuex) 

export default new Vuex.Store({
    modules: {
        targets
    }
})
