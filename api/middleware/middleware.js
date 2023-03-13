const User = require('../users/users-model')


function logger(req, res, next) {
  // DO YOUR MAGIC
  const timeStamp = new Date().toLocaleString()
  const method = req.method
  const URL = req.originalURL
  console.log(`[${timeStamp}] ${method} to ${URL}`);
  next();      
}

async function validateUserId(req, res, next) {
  try {
    const user = await User.getById(req.params.id)
    if (!user) {
      res.status(404).json({
        message: 'no such user'
      })
    } else {
      req.user = user 
      next()
    }
  } catch(err) {
    res.status(500).json({
      message: 'problem finding user'
    })
  } 
}

function validateUser(req, res, next) {
  const { name } = req.body
  if(!name || !name.trim()) {
    res.status(400).json({
      message: "missing required name field",
    })
 } else {
  req.name = name.trim() //<<< this is making the name not have any white space
    next()
 }
}

function validatePost(req, res, next) {
  const { text } = req.body
  if(!text || !text.trim()) {
    res.status(400).json({
      message: "missing required text field",
    })
 } else {
  req.text = text.trim() //<<< this is making the name not have any white space
    next()
 }
}

module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost,
}

// do not forget to expose these functions to other modules
