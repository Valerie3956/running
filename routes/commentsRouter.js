const express = require("express")
const commentsRouter = express.Router()
const Comment = require("../models/comments")

//get all comments

commentsRouter.get("/", (req, res, next) => {
    Comment.find((err, comments) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(comments)
    })
})

// get comments by run

commentsRouter.get("/run/:runId", (req, res, next) => {
    Comment.find({run: req.params.runId}, (err, comments) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(comments)
    })
})

// get comments by user

commentsRouter.get("/user/:userId", (req, res, next) => {
    Comment.find({user: req.params.userId}, (err, comments) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(comments)
    })
})


//add new comment

commentsRouter.post("/:runId", (req, res, next) => {
    req.body.user = req.auth._id
    req.body.run = req.params.runId
    const newComment = new Comment(req.body)
    newComment.save((err, savedComment) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(201).send(savedComment)
    })
})

//delete comment



commentsRouter.delete("/:commentId", (req, res, next) => {
    Comment.findOneAndDelete(
      { _id: req.params.commentId, user: req.auth._id },
      (err, deletedComment) => {
        if(err){
          res.status(500)
          return next(err)
        }
        if(!deletedComment){
          res.status(403)
            return next(new Error("You may not delete someone else's comment"))
        }
        return res.status(200).send(`Successfully delete comment`)
      }
    )
  })

  //delete all comments for an run

  commentsRouter.delete("/run/:runId", (req, res, next) => {
    Comment.deleteMany({run : req.params.runId}, (err, deletedComments) => {
      if(err){
        res.status(500)
        return next(err)
      }
      return res.status(200).send("successfully deleted all comments for the run")
    })
  })

//modify comment


commentsRouter.put("/:commentId", (req, res, next) => {
    Comment.findOneAndUpdate(
      { _id: req.params.commentId, user: req.auth._id },
      req.body,
      { new: true },
      (err, updatedComment) => {
        if(err){
          res.status(500)
          return next(err)
        }
        if(!updatedComment){
          res.status(403)
          return next(new Error("You may not modify someone else's comment"))
        }
        return res.status(201).send(updatedComment)
      }
    )
  })


module.exports = commentsRouter