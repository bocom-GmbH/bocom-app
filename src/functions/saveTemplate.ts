import gql from 'graphql-tag';
import { useMutation } from '@vue/apollo-composable'
import debounce from 'lodash/debounce';


const saveTemplate = gql`
    mutation saveTemplate($dataToSave: JSON!) {
        saveTemplate(dataToSave: $dataToSave)
        {
            message
            success
        }
    }
`
const save = debounce((templateToSave: object) => {
    try {
        const { mutate: saveData } = useMutation(
            saveTemplate
        );
        saveData({ dataToSave: templateToSave });

    } catch (error) {
        console.log(error);
    }
}, 1500);

export {
    save
}
