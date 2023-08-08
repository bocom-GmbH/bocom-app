import gql from 'graphql-tag'

const checkPermission = gql`
    query Query($permissionId: String!) {
        checkPermission(permissionId: $permissionId)
    }
`


export{
    checkPermission
}