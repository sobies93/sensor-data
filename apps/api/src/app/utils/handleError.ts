const GENERIC_ERROR = 'Error has occurred';

export const handleError = (errorMessage:string) => 
    process.env.NODE_ENV === 'production' 
        ? GENERIC_ERROR
        : errorMessage;