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
            >
                Загрузить
            </button>
        </div>
        <div class="modal fade" id="importTargetsModal" tabindex="-1" aria-labelledby="importTargetsModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="importTargetsModalLabel">Загружить задачи из файла</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <form action="/" method="post" id="importTargetsForm" @submit.prevent="uploadTargets($event)">
                        <div class="modal-body">
                            <div class="form-group">
                                Выберите вариант загрузки:
                                <ul>
                                    <li><strong>Добавить:</strong> задачи из файла будут добавлены к уже существующим;</li>
                                    <li><strong>Перезаписать:</strong> существующие задачи будут УДАЛЕНЫ, после загрузки останутся только задачи из файла.</li>
                                </ul>
                                <select id="importTargetsType" class="custom-select">
                                    <option value="" selected disabled>...</option>
                                    <option value="push">Добавить</option>
                                    <option value="rewrite">Перезаписать</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="importTargetsFile">Файл задач:</label>
                                <input type="file" id="importTargetsFile" class="form-control-file" accept=".txt">
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-light" data-dismiss="modal">Отмена</button>
                            <button type="submit" class="btn btn-primary">Загрузить</button>
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

    computed: {

        ...mapGetters([

            'getTargets'
        ])
    },

    methods: {

        ...mapMutations([

            'importTargets'
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
            } else {

                false
            }

            if(fields.importTargetsFile.value) {

                if(fields.importTargetsFile.files[0].type == 'text/plain') {

                    data.file = fields.importTargetsFile.files[0]
                }
            } else {

                false
            }

            if(data.type && data.type) {
                
                let reader = new FileReader()

                reader.readAsText(data.file)

                reader.onload = function(evt) {

                    self.importTargets(evt.target.result)
                }
            }
        }
    }
}
</script>

<style lang="scss">
@import '@/assets/styles/scss/components/ImportTargets.scss';
</style>