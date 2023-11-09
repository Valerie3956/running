import React, { useState, useContext, useEffect } from 'react'
import { UserContext } from '../context/userContext'
import { RunContext } from '../context/runContext'
import RunForm from './runForm'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faPersonRunning, faMedal, faComment } from '@fortawesome/free-solid-svg-icons'
import CommentForm from './commentForm'
import Comment from './comment'

export default function Run(props) {

  const { distance, time, pace, date, _id, starUsers, medalUsers, runningstarUsers, addStar, addRunnerDude, addMedal, comments, isMyRunsPage } = props

  const { deleteRun, editRun } = useContext(UserContext)
const {runAxios} = useContext(RunContext)

const [commentToggle, setCommentToggle] = useState(false)

  const [toggle, setToggle] = useState(false)

const [runComments, setRunComments] = useState([])

  // get all comments for this run, thank you Jordan!
  useEffect(() => {
    setRunComments(comments)
  }, [])


  
    //update state after a new comment is added
    function addComment(newComment){
      runAxios.post(`api/comments/${_id}`, newComment)
      .then(res => setRunComments(prevState => [...prevState, res.data]))
      .catch(err => console.log(err.response.data.errMsg))
  }
  
  //delete comment
  
  function deleteComment(commentId){
    runAxios.delete(`api/comments/${commentId}`)
    .then(setRunComments(prevComments => prevComments.filter(comment => comment._id !== commentId)))
    .catch(err => console.log(err.response.data.errMsg))
  }
  
  //edit comment
  
  function editComment(inputs, _id){
  
    runAxios.put(`/api/comments/${_id}`, inputs)
    .then(res => {
      setRunComments(prevComments => prevComments.map(comment => comment._id !== _id? comment : res.data))
    })
    .catch(err => console.log(err.response.data.errMsg))
  }

  let runDate = date.split("T")[0]

  return (
    <>

      <div className="run">
        {toggle ?
          <>
            <RunForm btnText="Log Edit"
              submit={editRun}
              runId={_id}
              initDistance={distance}
              initTime={time}
              initPace={pace}
              initDate={date} />
            <button onClick={() => setToggle(prevToggle => !prevToggle)} className="smallButton">Close</button>
            <button className="smallButton" onClick={() => deleteRun(run._id)}>Delete Run</button>
          </>
          :
          <div className = "runStats">
            <h2>Date: {runDate}</h2>
            <h2>Distance: {distance} miles</h2>
            <h3>Time: {time}</h3>
            <h3>Pace: {pace}</h3>
            <div className = "reactions">
              <div>
                    <h4>{starUsers.length}</h4>
                <FontAwesomeIcon icon={faStar} onClick = {addStar} />
              </div>
              <div>
                <h4>{runningstarUsers.length}</h4>
                <FontAwesomeIcon icon={faPersonRunning} onClick = {addRunnerDude} />
              </div>
              <div>
                <h4>{medalUsers.length}</h4>
                <FontAwesomeIcon icon={faMedal} onClick = {addMedal}/>
              </div>
                </div>

{/* only render these buttons in the "view my runs" page */}

{isMyRunsPage && 
<>
            <button onClick={() => setToggle(prevToggle => !prevToggle)} className="smallButton">Edit Run</button>
            <button className="smallButton" onClick={() => deleteRun(_id)}>Delete Run</button>
</>
}

          </div >}

          {/* toggle comments view on or off */}
{commentToggle? 
<>

{runComments.map(comment => <Comment 
{...comment}
key = {comment._id}
commentId = {comment._id}
deleteComment = {deleteComment}
editComment = {editComment}
/>)
 }

 {/* add a form at the bottom of comments to add a comment */}

<CommentForm 
btnText = "Submit Comment" 
submit = {addComment}
initContent = ""
toggle = {() => setCommentToggle(prevToggle => !prevToggle)}
/> 

</>
: 
<div>
<h3>{runComments.length}</h3>
<FontAwesomeIcon icon={faComment} onClick = {() => setCommentToggle(prevToggle => !prevToggle)} />
</div>

}
      </div>
    </>
  )
}