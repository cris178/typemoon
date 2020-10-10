import React,{useEffect, useState, createContext} from 'react';
import Auth from 'aws-amplify';
import './comments.css'

function Comments() {
    const [commentOwnerID, setCommentOwnerID] = useState();
    const [commentOwnerUsername, setCommentOwnerUsername] = useState();
    const [content, setContent] = useState();

    useEffect(()=>{
        getUser();
    },[]);

    async function getUser (){

        /*
        await Auth.currentUserInfo().then(user =>{
            setCommentOwnerID(user.attributes.sub);
            setCommentOwnerUsername(user.username);
        });*/
    }

    function handleClick(){

    }
    
        return(
            <div className="comments" onClick={handleClick}>
                see comments
            </div>
        );

}

export default Comments;