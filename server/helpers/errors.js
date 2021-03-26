const errors = (res = null, status = null, err = null, errMsg = null) => {
    if (err) {
        console.log(err);
    }
    if (res) {
        res.status(status).json({
            error: `(${status}) ${errMsg}`,
        });
    }
};

module.exports = errors;
