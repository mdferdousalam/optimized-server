const LogReqUrl = (req, res, next) => {
  console.log(`${new Date().toString()} => Request URL : ${req.originalUrl}`);
  next();
};

export default LogReqUrl;