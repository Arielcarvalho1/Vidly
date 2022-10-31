/**
 * This is a middleware.
 * It does it's thing and then call the "next" function
 * to continue on with the code wherever it is invoked
 */

function logger(request, response, next) {
    console.log("Logging...");
    next();
}

module.exports = logger;