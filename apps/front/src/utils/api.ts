import { GraphQLClient } from 'graphql-request'

export const graphQLClient = new GraphQLClient(
  `${process.env.CMS_URL || 'http://localhost:3022'}/api/graphql`
)
