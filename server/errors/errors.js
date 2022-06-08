

const NotFoundError = {
    status: 404,
    message: "Not Found"
}

const InvalidRequestError = {
    status: 404,
    message: "Invalid request parameters"
} 
const InternalServerError = {
    status: 500,
    message: "Internal Server Error"
}

const InvalidCredentialsError = {
    status: 401,
    message: "Unauthorized"
}

const FaceDetectionApiError = {
    status: 400,
    message: "Bad Request"
}

module.exports = {
    NotFoundError,
    InvalidRequestError,
    InternalServerError,
    InvalidCredentialsError,
    FaceDetectionApiError
}
