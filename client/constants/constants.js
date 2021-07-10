/**
 * Constants
 * Messages: For loggers and responses
 * Client id: Differentiate 2 clients
 */
const CLIENT_ID = (name) => {
  return `client${name}`
}
module.exports = {
    MESSAGES: {
      SUCCESS: 'Successfully completed the request',
      NOT_FOUND: 'Request Handler not found',
      INVALID_REQUEST: 'Invalid Request key',
      INSUFFICIENT_BALANCE: 'Balance is not enough to withdraw'   
    },
    CLIENT_ID
}