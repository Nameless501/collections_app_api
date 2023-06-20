enum HttpStatusCodes {
    dataCreated = 201,
    dataUpdated = 204,
    badRequest = 400,
    dataAccessError = 401,
    forbidden = 403,
    notFound = 404,
    emailConflict = 409,
    defaultError = 500,
}

export default HttpStatusCodes;