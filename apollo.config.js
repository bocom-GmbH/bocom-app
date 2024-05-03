/* eslint-env node */
// See https://www.apollographql.com/docs/devtools/apollo-config/
module.exports = {
  client: {
    service: {
      name: 'my-service',
      url: 'http://localhost:3000/graphql',
    },

    includes: ['src/**/*.vue', 'src/**/*.js', 'src/**/*.ts'],
  },
}
