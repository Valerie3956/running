import React, { useState, useContext } from 'react'
import { UserContext } from '../context/userContext'
import CommentForm from './commentForm'



export default function Comment(props) {

    const { user: { _id } } = useContext(UserContext)
    const userId = _id


    const { content, userName, user, commentId, deleteComment, editComment, inputs } = props

    const [toggle, setToggle] = useState(false)




    return (
        <div className="comment">
            <p>commented by: {userName}</p>
            <p>{content}</p>
            {/* only make it possible to edit or delete comment if the user logged in is the user who created the comment */}

            {user === userId && <>

                {/* toggle to toggle the form or display only edit and delete buttons */}

                {toggle ?

                    // comment form

                    <CommentForm
                        btnText="Submit Edit"
                        toggle={() => setToggle(prevToggle => !prevToggle)}
                        commentId={commentId}
                        submit={editComment}
                        inputs={inputs}
                        initContent={content}
                    />

                    :

                    // edit and delete buttons

                    <button className="smallButton" onClick={() => setToggle(prevToggle => !prevToggle)}>Edit</button>}
                <button className="smallButton" onClick={() => deleteComment(props._id)}>Delete</button>
            </>}

        </div>
    )
}