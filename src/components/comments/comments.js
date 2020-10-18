import React,{useEffect, useState, useContext} from 'react';
import {Context} from '../../context';
import Auth from 'aws-amplify';
import './comments.css'
import { propStyle } from 'aws-amplify-react';

function Comments(props) {
    const [submission, setSubmission] = useState();
    const [commentOwnerID, setCommentOwnerID] = useState();
    const [commentOwnerUsername, setCommentOwnerUsername] = useState();
    const [content, setContent] = useState();

    const {user,setUser} = useContext(Context);

    useEffect(()=>{
    },[]);

    useEffect(()=>{
    },[]);
  
    function handleTermChange(event){
        console.log(event.target.value);
        setSubmission(event.target.value);
    }
    async function onKeyUp(event){
    //Potential issue. The keyup is detected mutiple times and ran twice. Need to catch per second maybe.
        if (event.charCode === 13) {
            handleSubmission(1);
        }
    }
    async function handleSubmission(event){
        if(event !== 1){
            event.preventDefault();
        }
        
        /*
        const input ={
            id: props.id,
            postOwnerId: user.postOwnerId,
            postOwnerUsername: user.postOwnerUsername,
            postTitle: "Text: ",
            postBody: submission
        }
        */
        /*
        console.log("Sending Edit through GraphQL-----");
        console.log("Sending id: " + input.id);
        console.log("Sending Edite Post Body: " + input.postBody);
        console.log("Sending username and userid: " + input.postOwnerUsername + " "+ input.postOwnerId);
        console.log("----------");
        setSubmission("");
        await API.graphql(graphqlOperation(updatePost,{input}));
        */
        

    }
    
    function exit(){
          
        //props.hideModal();
    }

    function handleClick(){
        props.handleComments(true);
    }
    
        return(
            <div className="comments" onClick={handleClick}>
                see comments
            </div>
        );

}

export default Comments;