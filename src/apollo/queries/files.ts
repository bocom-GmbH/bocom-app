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

export {queryFileData, getMagazine}
