module.exports = asyncMiddleware(routeHandler) {
    return async(req,res,next) => {
        try { 
            await routeHandler(req,res)
        } catch(ex) {
            next(ex)
        }
    }
}