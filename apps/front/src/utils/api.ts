import { GraphQLClient } from 'graphql-request'

const apiUrl = `${process.env.CMS_URL || 'http://localhost:3022'}/api/graphql`

export const graphQLClient = new GraphQLClient(apiUrl, { credentials: 'include' })
