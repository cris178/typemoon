import React,{useEffect, useState, useContext} from 'react';
import {Context} from '../../context';
import {Auth} from 'aws-amplify';
import './createCommentPost.css';

function Comments() {

    //Fields required for createComment mutation
    const [commentOwnerID, setCommentOwnerID] = useState();
    const [commentOwnerUsername, setCommentOwnerUsername] = useState();
    const [content, setContent] = useState();

    const {user,setUser} = useContext(Context);

    useEffect(()=>{
        console.log("Running userEffect createCommentPost");
        setCommentOwnerID(user.postOwnerId);
        setCommentOwnerUsername(user.postOwnerUsername)
    },[]);

    async function getUser (){
        
    }

    function handleClick(e){
        e.preventDefault();
        console.log("Comment button clicked");

    }
    
        return(
            <div className="createCommentPost">
                <form>
                    <input type="text" placeholder={"write a comment"} style={{flex: 1}} />
                    <button className="commentButton" onClick={handleClick}>Send</button> 
                </form>
            </div>
        );

}

export default Comments;