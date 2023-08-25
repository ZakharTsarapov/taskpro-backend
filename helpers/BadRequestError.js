import HttpError from './HttpError';
const BadRequestError = (error, req, res, next) => {
  if (error) {
    const messageError = error.details.map(detail => detail.message).join(' ');
    throw HttpError(400, messageError);
  }
};

export default BadRequestError;
