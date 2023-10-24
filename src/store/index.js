import { createStore } from 'vuex'

import lang from '@/store/modules/lang'
import translater from '@/store/modules/translater'
import targets from '@/store/modules/targets'

export default createStore({

    modules: {

        lang,
        translater, 
        targets
    }
})
