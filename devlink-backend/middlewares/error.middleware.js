const errorMiddleware = (err, req, res, next) => {
  // Clone the original error
  let statusCode = err.statusCode || 500;
  let message = err.message || "Server Error";

  // Mongoose: bad ObjectId
  if (err.name === "CastError") {
    statusCode = 404;
    message = "Resource not found";
  }

  // Mongoose: duplicate key
  if (err.code === 11000) {
    statusCode = 400;
    message = "Duplicate field value entered";
  }

  // Mongoose: validation error
  if (err.name === "ValidationError") {
    statusCode = 400;
    // Extracts all individual validation error messages from Mongoose's ValidationError object,
    // maps them into a simple array of strings, then joins them into a single comma-separated message.
    //{
    //   errors: {
    //     email: { message: 'Email is invalid' },
    //     password: { message: 'Password is too short' }
    //   }
    //}
    // into: "Email is invalid, Password is too short"
    message = Object.values(err.errors)
      .map((val) => val.message)
      .join(", ");
  }

  // Log the full error
  console.error(statusCode);

  res.status(statusCode).json({
    success: false,
    error: message,
  });
};

export default errorMiddleware;
