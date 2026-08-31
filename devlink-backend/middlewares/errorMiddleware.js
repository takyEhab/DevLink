const errorMiddleware = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Server Error";

  if (err.name === "CastError") {
    statusCode = 404;
    message = "Resource not found";
  }

  if (err.code === "ER_DUP_ENTRY") {
    statusCode = 400;
    message = "Duplicate field value entered";
  }

  if (err.code === "ER_NO_SUCH_TABLE") {
    statusCode = 500;
    message = "Database table is missing";
  }

  console.error("Error:", err);

  res.status(statusCode).json({
    success: false,
    error: message,
  });
};

export default errorMiddleware;
