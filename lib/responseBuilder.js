module.exports = function(message, err=null) {
    // Base response object
    const response = {
        status: "",
        error: null,
        message: ""
    };

    if (err != null) {
        response.status     = "failure";
        response.error      = err;
        response.message    = message;
        return response;
    } else {
        response.status     = "success";
        response.message    = message;
        return response;
    }

}
