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

const getAllProjectsToClient = gql`
    query QueryProjectsToClient {
        getAllProjectsToClient {
            number
            year
            name
            startdate
            statelist {
                state
                date
            }
        }
    }
`

export { queryFileData, getMagazine, getSiteById, getAllProjectsToClient }
