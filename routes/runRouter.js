const express = require("express")
const runRouter = express.Router()
const Run = require("../models/runs")
const User = require('../models/user')
const Comment = require('../models/comments')

//get all runs

runRouter.get('/getAll', async(req, res, next) => {
    try{
        const users = await User.find()
        const allData = await Promise.all(users.map(async user => {
            const userRuns = await Run.find({user: user._id})
            const runsWithComments = await Promise.all( userRuns.map(async run => {
                const comments = await Comment.find({run: run._id})
                return {...run.toObject(), comments}
            }))
            return {...user.withoutPassword(), userRuns : runsWithComments, lastRun: runsWithComments[runsWithComments.length -1]}
        }))
        return res.status(200).send(allData)
    }catch(err){
        res.status(500)
        return next(err)
    }
})

//get runs by user

runRouter.get("/user", async(req, res, next) => {
    try{
        const userRuns = await Run.find({user: req.auth._id})
            const runsWithComments = await Promise.all( userRuns.map(async run => {
            const comments = await Comment.find({run: run._id})
            return {...run.toObject(), comments}
            }))
            return res.status(200).send(runsWithComments)
        }catch(err){
            res.status(500)
            return next(err)
        }
})

//get all users

// runRouter.get("user/getAll", (req, res, next) => {
//   User.find((err, users) => {
//     if(err){
//       res.status(500)
//       return next(err)
//     }
//     return res.status(200).send(users)
//   })
// })

//add new run

runRouter.post("/", async(req, res, next) => {
    try{
        req.body.user = req.auth._id
        const newRun = new Run(req.body)
        const savedRun = await newRun.save()
        const runUser = await User.findOneAndUpdate({_id: req.auth._id}, {$inc: {totalMiles: savedRun.distance}}, {new: true})
        const result ={savedRun, runUser: runUser.withoutPassword()}
        return res.status(201).send(result)
    }catch(err){
        res.status(500)
        return next(err)
    }
})

//delete run

runRouter.delete("/:runId", async(req, res, next) => {
try{
const deletedRun = await Run.findOneAndDelete({ _id: req.params.runId, user: req.auth._id })
const runUser = await User.findOneAndUpdate({_id: req.auth._id}, {$inc: {totalMiles: -deletedRun.distance}}, {new: true})
await Comment.deleteMany({run: req.params.runId})
const result ={deletedRun, runUser: runUser.withoutPassword()}
return res.status(201).send(result)
}catch(err){
    res.status(500)
    return next(err)
}
})


//modify run


runRouter.put("/:runId", async(req, res, next) => {
try{
    const runToBeEdited = await Run.findOne({ _id: req.params.runId, user: req.auth._id })
    await User.findOneAndUpdate({_id: req.auth._id}, {$inc: {totalMiles: -runToBeEdited.distance}}, {new: true})
    const editedRun = await Run.findOneAndUpdate({_id: req.params.runId, user: req.auth._id}, req.body, {new: true})
    const runUser = await User.findOneAndUpdate({_id: req.auth._id}, {$inc: {totalMiles: editedRun.distance}}, {new: true})
    const result ={editedRun, runUser: runUser.withoutPassword()
    }
return res.status(201).send(result)
}catch(err){
    res.status(500)
    return next(err)
}
})

//run reactions

runRouter.put("/star/:runId", (req, res, next) => {
    Run.findOneAndUpdate(
      { _id: req.params.runId },
      {
        $addToSet: { starUsers: req.auth._id },
        $pull: { medalUsers: req.auth._id },
        $pull: { runningstarUsers: req.auth._id }
      },
      { new: true },
      (err, updatedRun) => {
        if(err){
          res.status(500)
          return next(err)
        }
        return res.status(201).send(updatedRun)
      }
    )
  })

  runRouter.put("/runnerdude/:runId", (req, res, next) => {
    Run.findOneAndUpdate(
      { _id: req.params.runId },
      {
        $addToSet: { runningstarUsers: req.auth._id },
        $pull: { medalUsers: req.auth._id },
        $pull: { starUsers: req.auth._id }
      },
      { new: true },
      (err, updatedRun) => {
        if(err){
          res.status(500)
          return next(err)
        }
        return res.status(201).send(updatedRun)
      }
    )
  })

  runRouter.put("/medal/:runId", (req, res, next) => {
    Run.findOneAndUpdate(
      { _id: req.params.runId },
      {
        $addToSet: { medalUsers: req.auth._id },
        $pull: { starUsers: req.auth._id },
        $pull: { runningstarUsers: req.auth._id }
      },
      { new: true },
      (err, updatedRun) => {
        if(err){
          res.status(500)
          return next(err)
        }
        return res.status(201).send(updatedRun)
      }
    )
  })

module.exports = runRouter