const sanitizeHtml = require('sanitize-html')

module.exports.sanitize = (req,res,next) => {
    if (req.body) {
        for (let key in req.body) {
          if(key === 'files') {
            continue
          }
          if (typeof(key) === 'string') {
            if(req.body[key] === "") {
              return res.status(400).json({status: "error",message: "გთხოვთ შეავსოთ ყველა ველი"})
            }
            try {
              req.body[key] = sanitizeHtml(req.body[key],{
                    allowedTags: [],
                    allowedAttributes: {}
                })
              if (req.body[key] === "") {
                return res.status(400).json({status: "error",message: "გთხოვთ არ გამოიყენოთ სპეციალური სიმბოლოები"})
              }
            } catch(error) {
              return res.status(500).json({status: "error",message: "sanitize input Error"})
            }
          }
        }
    }
    if (req.query) {
        for (let key in req.query) {
          req.query[key] = sanitizeHtml(req.query[key]);
        }
      }
      
      if (req.params) {
        for (let key in req.params) {
          req.params[key] = sanitizeHtml(req.params[key]);
        }
    }

    next()
} 