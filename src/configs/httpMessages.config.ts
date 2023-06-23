enum HttpMessages {
    badRequest = 'Error: The request cannot be fulfilled.',
    validationError = 'Error: Request parameters is not valid.',
    dataAccessError = 'Error: Access error - needed authentication.',
    forbidden = "Error: You don't have permission to access this resource.",
    notFound = 'Error: Data not found.',
    emailConflict = 'Error: This email is already used.',
    tooManyRequests = 'Error: Too many requests maid from this IP, please try again after 15 minutes.',
    wrongCredentials = 'Error: Wrong email or password.',
    defaultError = 'Error: Something went wrong. Try again Later.',
}

export default HttpMessages;
