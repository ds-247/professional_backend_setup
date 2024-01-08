const asyncHandler = (func) => {
  return async (req, res, next) => {
    try {
      await func(req, res, next);
    } catch (err) {
      res.status(err.code || 500).json({
        success: false,
        message: err.message,
      });
    }
  };
};

// const asyncHandler = (reqHandler) => (req, res, next)=>{
//     Promise.resolve(reqHandler(req, res, next)).catch((err)=>next(err));
// }

export { asyncHandler };
