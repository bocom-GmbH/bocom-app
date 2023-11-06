import gql from 'graphql-tag';
import { useMutation } from '@vue/apollo-composable'
import debounce from 'lodash/debounce';
import { Notify } from 'quasar'

const saveTemplate = gql`
    mutation saveTemplate($dataToSave: JSON!) {
        saveTemplate(dataToSave: $dataToSave)
        {
            message
            success
        }
    }
`
const MAX_RETRIES = 2;

const save = debounce((templateToSave: object) => {
    const performSave = (retries = 0) => {
        const { mutate: saveData, onDone, onError } = useMutation(saveTemplate);
        console.log(templateToSave)
        saveData({ dataToSave: templateToSave });
        onError(() => {
            notify('Verbindungsfehler')
        })
        onDone((data: any) => {
            if (data.data.saveTemplate?.success === false) {

                if (retries < MAX_RETRIES - 1) {
                    performSave(retries + 1);
                } else {

                   notify(data.data?.saveTemplate?.message)
                }
            }
        });
    }
    try {
        performSave();
    } catch (error) {
        console.log(error);
    }
}, 1500);

const notify = (message: string) => {
    Notify.create({
        message: message,
        position: 'top',
        timeout: 1500,
        color: 'red',
        progress: true
    });
}


export {
    save
}
