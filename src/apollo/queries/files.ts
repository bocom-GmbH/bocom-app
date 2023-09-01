import gql from 'graphql-tag'

const queryFileData = gql`
    query QueryFileData($queryFileDataId: String) {
            queryFileData(id: $queryFileDataId) {
            data
            id
            label
            nodedata
            schemaId
            permission
        }
    }
`

const getMagazine = gql`
    query Magazin {
        Magazin {
            Jahr
            Templates
            id
            label
        }
    }
`

const getMitarbeiter = gql`
    query Mitarbeiter {
		Mitarbeiter {
			Titel
			id
			label
		}
    }
`
const getEditorialById = gql`
	query EditorialById($fileId: String!) {
		EditorialById(fileId: $fileId) {
			Synopsis_Header
			Synopsis_Text
			id
			label
		}
	}
`
const getTitelBildById = gql`
    query TitelbildById($fileId: String!) {
        TitelbildById(fileId: $fileId) {
            Bilder
            id
            label
        }
    }
`



export {queryFileData, getMagazine, getMitarbeiter, getEditorialById, getTitelBildById}
