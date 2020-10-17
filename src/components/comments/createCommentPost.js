import React,{useEffect, useState, useeContext} from 'react';
import {Context} from '../../context';
import {Auth} from 'aws-amplify';
import './comments.css'

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

    function handleClick(){

    }
    
        return(
            <div className="createCommentPost" onClick={handleClick}>
                see comments
            </div>
        );

}

export default Comments;