<template>
    <div class="ktg-card ktg-card_inline ktg-import">

        <div class="ktg-card__body">

            <h3 class="ktg-import__header">Импорт/экспорт</h3>
            <div class="ktg-import__descr">Загрузить/cкачать задачи для переноса между устройствами.</div>

            <div class="mt-3 ktg-import__buttons">
                <button 
                    type="button"
                    class="btn btn-primary mr-2 ktg-import__download"
                    :disabled="!getTargets.length"
                    @click.prevent="downloadTargets()"
                >
                    Скачать
                </button>
                <button 
                    type="button"
                    class="btn btn-primary mr-2 ktg-import__upload"
                    data-toggle="modal" 
                    data-target="#importTargetsModal" 
                    aria-hidden="true"
                    @click.prevent="importTargetsMsg = null"
                >
                    Загрузить
                </button>
            </div>

        </div>

        <div class="modal fade ktg-import__modal" id="importTargetsModal" tabindex="-1" aria-labelledby="importTargetsModalLabel" aria-hidden="true">
            <div class="modal-dialog ktg-import__modalDialog">
                <div class="modal-content ktg-import__modalContent">
                    <div class="modal-header ktg-import__modalHeader">
                        <h5 class="modal-title ktg-import__modalTitle" id="importTargetsModalLabel">Загружить задачи из файла</h5>
                        <button type="button" class="close ktg-import__modalClose" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <form class="ktg-import__modalForm" action="/" method="post" id="importTargetsForm" @submit.prevent="uploadTargets($event)">
                        <div class="modal-body ktg-import__modalBody">
                            <div class="ktg-import__result" v-if="importTargetsMsg">
                                <div 
                                    class="alert"
                                    :class="{
                                        'alert-success' : importTargetsMsg.success,
                                        'alert-danger' : !importTargetsMsg.success
                                    }"
                                >
                                    {{ importTargetsMsg.text }}
                                </div>
                            </div>
                            <div class="ktg-import__error" v-if="formErrors.length">
                                <div class="alert alert-danger">
                                    <div v-for="error in formErrors" :key="error">
                                        {{ error }}
                                    </div>
                                </div>
                            </div>
                            <div class="form-group ktg-import__modalFormGroup">
                                <label for="importTargetsMethod"> Способ загрузки:</label>
                                <select 
                                    id="importTargetsMethod" 
                                    class="custom-select ktg-import__modalFormInput"
                                    :class="{ 'is-invalid': 'importTargetsMethod' in invalidFields }" 
                                    @change="checkValid($event)"
                                >
                                    <option value="" selected disabled>...</option>
                                    <option value="push">Добавить</option>
                                    <option value="rewrite">Перезаписать</option>
                                </select>
                                <ul class="mt-2 mb-4 ktg-import__modalFormLabel">
                                    <li><strong>Добавить:</strong> задачи из файла будут добавлены к уже существующим;</li>
                                    <li><strong>Перезаписать:</strong> существующие задачи будут УДАЛЕНЫ, после загрузки останутся только задачи из файла.</li>
                                </ul>
                            </div>
                            <div class="form-group ktg-import__modalFormGroup">
                                <div class="custom-file" :class="{ 'is-invalid': 'importTargetsFile' in invalidFields }" >
                                    <input
                                        type="file" 
                                        id="importTargetsFile" 
                                        class="custom-file-input ktg-import__modalFormInput" 
                                        accept=".txt"
                                        :class="{ 'is-invalid': 'importTargetsFile' in invalidFields }" 
                                        @change="checkValid($event)"
                                    >
                                    <label for="importTargetsFile" class="custom-file-label ktg-import__modalFormLabel">Файл задач</label>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer ktg-import__modalFooter">
                            <button type="button" class="btn btn-light ktg-import__modalBtn" data-dismiss="modal">Отмена</button>
                            <button type="submit" class="btn btn-primary ktg-import__modalBtn">Загрузить</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import $ from 'jquery'
import { mapGetters, mapMutations } from 'vuex'

export default {

    name: 'ImportTargets',

    data() {

        return {

            invalidFields: {},
            formErrors: [],
            importTargetsMsg: null
        }
    },

    computed: {

        ...mapGetters([

            'getTargets'
        ])
    },

    methods: {

        ...mapMutations([

            'setTargets'
        ]),

        downloadTargets() {

            const targetsString = JSON.stringify(this.getTargets)
            const targetsFile = new Blob( [ targetsString ], {type: 'application/json'})
            
            let now     = new Date(),
                year    = now.getFullYear(),
                month   = ('0' + (Number(now.getMonth()) + 1)).slice(-2),
                day     = ('0' + now.getDate()).slice(-2),
                hours   = ('0' + now.getHours()).slice(-2),
                minutes = ('0' + now.getMinutes()).slice(-2),
                seconds = ('0' + now.getSeconds()).slice(-2)

            let a = document.createElement('a')

            a.href = URL.createObjectURL(targetsFile)
            a.download = 'KANTargetsImport__' + year + '-' + month + '-' + day + '_' + hours + '-' + minutes + '-' + seconds + '.txt'
            a.click()
        },

        async uploadTargets(form) {

            const self = this
            const fields = form.target.elements

            let data = {}

            this.invalidFields = {}
            this.formErrors = []

            if(fields.importTargetsMethod.value) {
                data.method = fields.importTargetsMethod.value
            } else {
                this.invalidFields.importTargetsMethod = true
                this.formErrors.push('Не выбран способ загрузки')
            }

            if(fields.importTargetsFile.value) {
                
                let file     = fields.importTargetsFile.files[0],
                    fileType = file.type,
                    fileExt  = file.name.split('.')[1]

                if( fileType == 'text/plain' || fileExt == 'txt' ) {
                    data.file = fields.importTargetsFile.files[0]
                } else {
                    this.invalidFields.importTargetsFile = true
                    this.formErrors.push('Неверный формат файла')
                }
            } else {
                this.invalidFields.importTargetsFile = true
                this.formErrors.push('Не выбран файл с задачами')
            }

            {{ this.formErrors }}

            if(this.formErrors.length == 0) {

                const reader = new FileReader()

                let targets = []

                switch( data.method ) {

                    case 'rewrite':
                        
                        reader.readAsText(data.file)

                        reader.onload = function(event) {

                            try {

                                const fileContent = JSON.parse(event.target.result)


                                for(let target of fileContent) {

                                    if(
                                        'name'      in target && 
                                        'descr'     in target && 
                                        'priority'  in target && 
                                        'created'   in target && 
                                        'id'        in target
                                    ) {

                                        targets.push({

                                            name: target.name,
                                            descr: target.descr,
                                            priority: target.priority,
                                            created: target.created,
                                            id: target.id
                                        })
                                    }
                                }
                            } catch {

                                self.importTargetsMsg = { success: false, text: 'Неверный формат файла!' }
                                return false
                            }

                            self.setTargets(targets)

                            self.importTargetsMsg = { success: true, text: 'Задачи успешно загружены' }
                        }

                        break

                    case 'push':

                        reader.readAsText(data.file)

                        reader.onload = function(event) {

                            try {

                                const fileContent = JSON.parse(event.target.result)

                                let targetID = 0

                                if(self.getTargets.length) {

                                    const allIDs = self.getTargets.map( target => target.id )

                                    targetID = Math.max.apply(null, allIDs) + 1
                                }

                                for(let target of fileContent) {

                                    if(
                                        'name'      in target && 
                                        'descr'     in target && 
                                        'priority'  in target && 
                                        'created'   in target
                                    ) {

                                        targets.push({

                                            name: target.name,
                                            descr: target.descr,
                                            priority: target.priority,
                                            created: target.created,
                                            id: targetID
                                        })

                                        targetID++
                                    }
                                }
                            } catch {

                                self.importTargetsMsg = { success: false, text: 'Неверный формат файла!' }
                                return false
                            }

                            targets = [...self.getTargets, ...targets]

                            self.setTargets(targets)

                            self.importTargetsMsg = { success: true, text: 'Задачи успешно загружены' }
                        }

                        break
                }

            }
        },

        checkValid($event) {

            $event.target.classList.remove('is-invalid')
        }
    },

    mounted() {

        const self = this

        $('#importTargetsModal').on('hidden.bs.modal', function() {
            self.formErrors = []
            self.invalidFields = {}
            self.importTargetsMsg = null
            document.querySelector('#importTargetsForm').reset()
        })
    }
}
</script>

<style lang="scss">
@import '@/assets/styles/scss/components/ImportTargets.scss';
</style>