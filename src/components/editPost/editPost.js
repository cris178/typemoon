import React,{useEffect,useState, useContext} from 'react';
import './editPost.css';
import {Context} from '../../context';
import { API, graphqlOperation } from 'aws-amplify';
import { updatePost } from '../../graphql/mutations';

function EditPost (props){
    const [submission, setSubmission] = useState("");
    const {user,setUser} = useContext(Context);

    useEffect(()=>{
      setSubmission(props.body);
    },[]);

    function handleTermChange(event){
        console.log(event.target.value);
        setSubmission(event.target.value);
    }
    function onKeyUp(event){
        if (event.charCode === 13) {
            handleSubmission(1);
        }
    }
    async function handleSubmission(event){
        if(event !== 1){
            event.preventDefault();
        }
        const input ={
            //postOwnerId: user.postOwnerId,
            //postOwnerUsername: user.postOwnerUsername,
            id: props.id,
            postOwnerId: user.postOwnerId,
            postOwnerUsername: user.postOwnerUsername,
            postTitle: "Text: ",
            postBody: submission,

        }
        console.log("Editing: "+ input.postOwnerId + input.postOwnerUsername);
        await API.graphql(graphqlOperation(updatePost,{input}));
        //pass in the input object we just created
       //await API.graphql(graphqlOperation(createPost, {input}));

        //After sending the data we want to clean up.
        setSubmission("");
        exit();

    }
    function exit(){
        props.hideModal();
    }

    return(
        <div className="editPost">
         
          <div style={{margin: "auto", position: "relative" }}>
              <form role="form" id="modal-input-container" className="ui modal-input-container property-list-large">
                <div className="property-list-small">
                  <h6 className="title">Edit Post</h6>
                  <label id="modal-input-container-message" style={{fontSize:0.9+ 'em'}}>Run it back!</label>
                </div>

                
                <div className="property-list">
                  <div className="property-item">
                    <input type="text" onKeyPress={onKeyUp} onChange={handleTermChange} value={submission} style={{flex: 1}} />
                  </div>
                </div>

                <div className="property-list">
                    <button className="button active" type="submit" onClick={handleSubmission}>Send</button>
                    <a onClick={exit} style={{textDecoration: 'underline', cursor: 'pointer'}}>Lets go back</a>
                </div>

              </form>
          </div>
        </div>
    );
}

export default EditPost;