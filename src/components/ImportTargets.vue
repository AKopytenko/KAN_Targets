<template>
    <div class="pt-4 ktg-import">
        <h3 class="ktg-import__header">Импорт/экспорт</h3>
        <div class="ktg-import__descr">Загрузить/cкачать задачи для переноса между устройствами.</div>
        <div class="my-3 ktg-import__buttons">
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
                @clock.prevent="importTargetsMsg = null"
            >
                Загрузить
            </button>
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
                            <div class="ktg-import__modalResult" v-if="importTargetsMsg">
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
                            <div class="form-group ktg-import__modalFormGroup">
                                Способ загрузки:
                                <ul class="ktg-import__modalFormLabel">
                                    <li><strong>Добавить:</strong> задачи из файла будут добавлены к уже существующим;</li>
                                    <li><strong>Перезаписать:</strong> существующие задачи будут УДАЛЕНЫ, после загрузки останутся только задачи из файла.</li>
                                </ul>
                                <select id="importTargetsType" class="custom-select ktg-import__modalFormInput">
                                    <option value="" selected disabled>...</option>
                                    <option value="push" disabled>Добавить</option>
                                    <option value="rewrite">Перезаписать</option>
                                </select>
                            </div>
                            <div class="form-group ktg-import__modalFormGroup">
                                <label for="importTargetsFile" class="ktg-import__modalFormLabel">Файл задач:</label>
                                <input type="file" id="importTargetsFile" class="form-control-file ktg-import__modalFormInput" accept=".txt">
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
import { mapGetters, mapMutations } from 'vuex'

export default {

    name: 'ImportTargets',

    data() {

        return {

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

            if(fields.importTargetsType.value) {

                data.type = fields.importTargetsType.value
            }

            if(fields.importTargetsFile.value) {

                if(fields.importTargetsFile.files[0].type == 'text/plain') {

                    data.file = fields.importTargetsFile.files[0]
                }
            }

            if(data.type && data.file) {

                console.log('Поля заполнены')
                
                const reader = new FileReader()

                reader.readAsText(data.file)

                reader.onload = function(event) {

                    try {

                        const fileContent = JSON.parse(event.target.result)

                        let targets = []

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

                            } else {

                                self.importTargetsMsg = { success: false, text: 'ОШИБКА: Неверный формат файла!' }
                                return false
                            }
                        }
                    } catch {

                        self.importTargetsMsg = { success: false, text: 'ОШИБКА: Неверный формат файла!' }
                        return false
                    }

                    self.setTargets(event.target.result)

                    self.importTargetsMsg = { success: true, text: 'Задачи успешно загружены' }
                }
            } else {

                self.importTargetsMsg = { success: false, text: 'Не заполнено обязательное поле' }
                return false
            }
        }
    }
}
</script>

<style lang="scss">
@import '@/assets/styles/scss/components/ImportTargets.scss';
</style>