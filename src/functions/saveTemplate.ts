import gql from 'graphql-tag';
import { useMutation } from '@vue/apollo-composable'
import debounce from 'lodash/debounce';
import { notify } from './notification'

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

//save the template with maximal 2 retries
const save = debounce((templateToSave: object) => {
    console.log('save')
    const performSave = (retries = 0) => {
        const { mutate: saveData, onDone, onError } = useMutation(saveTemplate);
        console.log(templateToSave)
        saveData({ dataToSave: templateToSave });
        //on error make a notification
        onError(() => {
            //imported external function to make a notification
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


export {
    save
}
