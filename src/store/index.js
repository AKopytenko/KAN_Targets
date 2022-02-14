import Vue from 'vue'
import Vuex from 'vuex'

import targets      from './modules/targets'        // Список задач | Targets list
import lang         from './modules/lang.js'        // Язык интерфейса | App language
import translater   from './modules/translater.js'  // Языковые константы для локализации | Language constants

Vue.use(Vuex) 

export default new Vuex.Store({

    modules: {

        targets,
        lang,
        translater
    }
})
