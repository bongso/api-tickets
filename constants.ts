export const REGION = 'ap-northeast-2'
export const GITHUB_ORGANIZATION = 'bongso'
export const COLLECTION_STARTUP  = 'startup'
export const COLLECTION_SOURCES  = 'sources'

export enum URI {
  HOME = 'bglee.me',
  OPS  = 'ops.bglee.me',
  TICKETS = 'tickets.bglee.me'
}

export const ErrorMessage = {
  ConnectionError: `db connection error(url set? ${Boolean(process.env.MONGODB)})`,
  UserNotFound: 'user not found from authorization header',
  ParameterRequired: 'required parameter is missed'
}

export const headers = {
  'Access-Control-Allow-Origin': '*'
}

export const DEFAULT_LIMIT = '30'
