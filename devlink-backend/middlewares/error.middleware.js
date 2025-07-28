const errorMiddleware = (err, req, res, next) => {
  // Log the full error
  console.error(err);

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
    message = Object.values(err.errors).map((val) => val.message).join(", ");
  }

  res.status(statusCode).json({
    success: false,
    error: message,
  });
};

export default errorMiddleware;

// const errorMiddleware = (err, req, res, next) => {
//   try {
//     let error = { ...err };
//     error.message = err.message;
//     console.error(err);

//     //mongoose bad objectID
//     if (err.name === "castError") {
//       const message = "resource not found";
//       error = new Error(message);
//       error.statusCode(404);
//     }

//     //mongoose duplicate key
//     if (error.code === 11000) {
//       const message = "duplicate field value entered";
//       error = new Error(message);
//       error.statusCode(400);
//     }

//     //mongoose validation error
//     if (err.name === "ValidationError") {
//       const message = Object.values(err.errors).map((val) => val.message);
//       error = new Error(message.join(", "));
//       error.statusCode(400);
//     }
//     res
//       .status(error.statusCode || 500)
//       .json({ success: false, error: error.message || "server error" });
//   } catch (error) {
//     // console.log(error);
//     // console.log(error.message);
//     next(error);
//   }
// };

// export default errorMiddleware;
