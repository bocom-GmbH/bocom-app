import gql from 'graphql-tag'

const loginWithTokenMutation = gql`
    mutation Login (
        $username: String!,
        $password: String!
    ) {
        login (
            username: $username,
            password: $password
        ) {
            token
        }
    }
`

export {
    loginWithTokenMutation
}