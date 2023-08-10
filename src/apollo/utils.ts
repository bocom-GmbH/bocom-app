import { provideApolloClient } from '@vue/apollo-composable';
import { ApolloClient /*, createHttpLink */ } from '@apollo/client/core'
import { getClientOptions } from 'src/apollo'

const useApolloClient = () => {
    provideApolloClient(new ApolloClient(getClientOptions()));
}

export {useApolloClient};