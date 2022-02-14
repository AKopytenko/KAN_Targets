export default {

    state: {

        RU: {

            BTN_NEW_TASK:               'Новая задача',
            BTN_DOWNLOAD:               'Скачать',
            BTN_UPLOAD:                 'Загрузить',
            BTN_ADD:                    'Добавить',
            BTN_EDIT:                   'Редактировать',
            BTN_SAVE:                   'Сохранить',
            BTN_CANCEL:                 'Отмена',
            BTN_DELETE:                 'Удалить',

            TARGETS_EMPTY:              'Список задач пуст',

            TARGET_NEW_HEADER:          'Новая задача',
            TARGET_NEW_NAME:            'Название',
            TARGET_NEW_TEXT:            'Описание',
            TARGET_NEW_PRIORITY:        'Приоритетная задача',
            TARGET_NEW_SUCCESS:         'Новая задача успешно добавлена',

            TARGET_DATE:                'Добавлена',
            TARGET_CLOSED:              'Задача завершена',

            TARGET_DELETE_HEADER:       'Удаление задачи',
            TARGET_DELETE_ALERT:        'Выбранная задача будет удалена без возможности восстановления',

            TARGET_UPDATE_SUCCESS:      'Задача успешно отредактирована',

            IMPORT_TITLE:               'Импорт/экспорт',
            IMPORT_DESCR:               'Загрузить/cкачать задачи для переноса между устройствами',
            IMPORT_HEADER:              'Загрузить задачи из файла',
            IMPORT_METHOD:              'Способ загрузки',
            IMPORT_ADD:                 'Добавить',
            IMPORT_ADD_DESCR:           'Задачи из файла будут добавлены к уже существующим',
            IMPORT_REWRITE:             'Перезаписать',
            IMPORT_REWRITE_DESCR:       'Существующие задачи будут УДАЛЕНЫ, после загрузки останутся только задачи из файла',
            IMPORT_FILE_TITLE:          'Файл задач',
            IMPORT_FILE_TEXT:           'Выберите файл',
            IMPORT_SUCCESS:             'Задачи успешно загружены',

            ERROR_TARGET_TITLE:         'Введите название задачи',
            ERROR_TARGET_TEXT:          'Введите текст задачи',
            ERROR_TARGET_ADD:           'Ошибка добавления задачи',
            ERROR_TARGET_EDIT:          'Ошибка при попытке редактирования задачи',
            ERROR_SEARCH_EMPTY:         'Нет задач, содержащих указанный текст',
            ERROR_TARGETS_READ:         'Ошибка чтения задач',
            ERROR_IMPORT_METHOD:        'Не выбран способ загрузки',
            ERROR_IMPORT_FILE:          'Не выбран файл с задачами',
            ERROR_IMPORT_FILE_FORMAT:   'Неверный формат файла'
        },

        EN: {

            BTN_NEW_TASK:               'New target',
            BTN_DOWNLOAD:               'Download',
            BTN_UPLOAD:                 'Upload',
            BTN_ADD:                    'Add',
            BTN_EDIT:                   'Edit',
            BTN_SAVE:                   'Save',
            BTN_CANCEL:                 'Cancel',
            BTN_DELETE:                 'Delete',

            TARGETS_EMPTY:              'Targets list empty',

            TARGET_NEW_HEADER:          'New target',
            TARGET_NEW_NAME:            'Title',
            TARGET_NEW_TEXT:            'Text',
            TARGET_NEW_PRIORITY:        'Priority target',
            TARGET_NEW_SUCCESS:         'New target successfully added',

            TARGET_DATE:                'Date',
            TARGET_CLOSED:              'Target closed',

            TARGET_DELETE_HEADER:       'Task delete',
            TARGET_DELETE_ALERT:        'The selected task will be permanently deleted',

            TARGET_UPDATE_SUCCESS:      'Target successfully edited ',

            IMPORT_TITLE:               'Import/Export',
            IMPORT_DESCR:               'Upload/Download targets for transfer between devices',
            IMPORT_HEADER:              'Upload from file',
            IMPORT_METHOD:              'Upload method',
            IMPORT_ADD:                 'Add',
            IMPORT_ADD_DESCR:           'Targets from the file will be added to existing ones',
            IMPORT_REWRITE:             'Rewrite',
            IMPORT_REWRITE_DESCR:       'Existing targets will be DELETED, only targets from the file will remain after downloading.',
            IMPORT_FILE_TITLE:          'File',
            IMPORT_FILE_TEXT:           'Select a file',
            IMPORT_SUCCESS:             'Tasks loaded successfully',

            ERROR_TARGET_TITLE:         'Enter target title',
            ERROR_TARGET_TEXT:          'Enter target text',
            ERROR_TARGET_ADD:           'Error adding task',
            ERROR_TARGET_EDIT:          'Error while trying to edit a task',
            ERROR_SEARCH_EMPTY:         'No targets containing the inputed text',
            ERROR_TARGETS_READ:         'Reading targets error',
            ERROR_IMPORT_METHOD:        'Download method not selected',
            ERROR_IMPORT_FILE:          'Targets file is not selected',
            ERROR_IMPORT_FILE_FORMAT:   'Invalid file format'
        }
    },

    getters: {

        getTranslate: ( state, getters, rootState) => state[rootState.lang.lang]
    }
}