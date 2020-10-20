import React,{useEffect, useState, useContext} from 'react';
import {Context} from '../../context';
import {Auth, API, graphqlOperation} from 'aws-amplify';
import './createCommentPost.css';
import { createComment } from '../../graphql/mutations';

function Comments(props) {

    //Fields required for createComment mutation
    const [commentOwnerIDState, setCommentOwnerID] = useState();
    const [commentOwnerUsernameState, setCommentOwnerUsername] = useState();
    const [contentState, setContent] = useState("");

    const {user,setUser} = useContext(Context);

    useEffect(()=>{
        console.log("Running userEffect createCommentPost");
        setCommentOwnerID(user.postOwnerId);
        setCommentOwnerUsername(user.postOwnerUsername)
    },[]);

   
    function handleChange(e){
        console.log(contentState);
        setContent(e.target.value); //very important to get .target.value or else it's a synthetic event
    }

    //handle add comment
    async function handleClick(e){
        e.preventDefault();
        console.log("Comment button clicked");
        const input = {
            commentPostId: props.postID,
            commentOwnerId: commentOwnerIDState,
            commentOwnerUsername: commentOwnerUsernameState,
            content: contentState,
            createdAt: new Date().toISOString()
        }
        setContent("");
        await API.graphql(graphqlOperation(createComment,{input}));
        
        
    }
    
        return(
            <div className="createCommentPost">
                <form role="form">
                    <input type="text"  placeholder="Write comment"  style={{flex: 1}} onChange={handleChange} />
                    <button type="submit" className="commentButton" onClick={handleClick}>Send</button> 
                </form>
            </div>
        );

}

export default Comments;