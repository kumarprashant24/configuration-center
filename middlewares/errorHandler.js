module.exports = (error, req, res, next) => {
  if (!error.status) {
    res.status(500).send({
      error: { code: "UNKNOWN_ERROR", message: "An unknown error occurred." },
    });
  } else {
    res
      .status(error.status)
      .send({ error: { code: error.status, message: error.message } });
  }
};
