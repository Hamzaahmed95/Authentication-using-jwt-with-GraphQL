const { gql } = require('apollo-server-express');

module.exports = gql`
scalar DateTime

type Mutation{
    signUp(username: String!,email: String!, password: String!):String!
    signIn(username: String!,email: String, password: String!):String!
}
type Query {
    _dummy: String
}

`;
