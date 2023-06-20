abstract class HttpError extends Error {
    protected constructor(public statusCode: number, public message: string) {
        super(message);
    }
}

export default HttpError;