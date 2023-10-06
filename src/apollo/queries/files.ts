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
/*
const getMagazine = gql`
    query Magazin {
        Magazin {
            Jahr
            Templates
            id
            label
        }
    }
` */

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
const getMagazine = gql`
    query Magazin {
        Magazin {
            Jahr
            TemplateIds
            id
            label
        }
    }
`

const getSiteById = gql`
    query Seite($templateId: String!) {
    Seite(templateId: $templateId) {
            data
            label
            metadata {
                id
                schemaId
            }
        }
    }
`


export { queryFileData, getMagazine, getMitarbeiter, getEditorialById, getTitelBildById, getSiteById }
