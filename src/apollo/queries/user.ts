import gql from 'graphql-tag'

const checkPermission = gql`
    query Query($permissionId: String!) {
        checkPermission(permissionId: $permissionId)
    }
`

const getComponentHub = gql`
    query getComponentHub {
        getComponentHub {
            componentId
            component
            requireMainConfigurator
        }
    }
`


export{
    checkPermission,
    getComponentHub
}