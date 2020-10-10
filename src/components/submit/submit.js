import { API, graphqlOperation,Auth } from 'aws-amplify';
import {createPost} from '../../graphql/mutations';
import React,{useEffect,useContext, useState} from 'react';
import {Context} from '../../context';
import './submit.css';


function Submit (props){
    const [submission,setSubmission] = useState("");
    const {user, setUser } = useContext(Context);
    useEffect(()=>{
        getUser();
    },[]);//second parameter is the dependency array, retriggers used effect when change in state?

    async function getUser(){
        await Auth.currentUserInfo().then(userGet =>{
        const newUser = {
          postOwnerId:userGet.attributes.sub,
          postOwnerUsername: userGet.username,
        };
        setUser(newUser);
      });
    }

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
            postOwnerId: user.postOwnerId,
            postOwnerUsername: user.postOwnerUsername,
            postTitle: "Text: ",
            postBody: submission,
            createdAt: new Date().toISOString()
        }
        console.log("SUBMITTING: "+ input.postOwnerId + input.postOwnerUsername);
        //pass in the input object we just created
        await API.graphql(graphqlOperation(createPost, {input}));

        //After sending the data we want to clean up.
        setSubmission("");

    }
    return(
        <div className="Submit border-left border-right">
            <div className="submitPost">
            <input onChange={handleTermChange} onKeyPress={onKeyUp} type="text" className="post" placeholder="What's happening?" required value={submission}/> 
            <button onClick={handleSubmission} className="submitButton">Submit</button>
            {/*<hr></hr>*/}
            </div>
        </div>
    );

}
/*
class Submit extends React.Component{

    constructor(props){
        super(props);
        this.state ={
            postOwnerId: "",
            postOwnerUsername: "", 
            submission: ""
        }
        this.handleTermChange = this.handleTermChange.bind(this);
        this.handleSubmission = this.handleSubmission.bind(this);
        this.onKeyUp = this.onKeyUp.bind(this);
    }
    
    componentWillMount = async  () =>{
        //Todo later
       await Auth.currentUserInfo().then(user =>{
            console.log("Curr User: " + user.username);
            console.log("Attributes: "+ user.attributes.sub);
            this.setState({
                postOwnerId:user.attributes.sub,
                postOwnerUsername: user.username,
            })
       });
    }
    
    //How to use enter key on forms https://www.pluralsight.com/guides/how-to-enter-key-event-handler-on-a-react-bootstrap-input-component
    onKeyUp(event){
        if (event.charCode === 13) {
            this.handleSubmission(1);
        }
    }


    handleTermChange(event){
        console.log(event.target.value);
        this.setState({
            submission:event.target.value
        })
    }

    handleSubmission = async event =>{
        if(event !== 1){
            event.preventDefault();
        }
        const input ={
            postOwnerId: this.state.postOwnerId,
            postOwnerUsername: this.state.postOwnerUsername,
            postTitle: "Text: ",
            postBody: this.state.submission,
            createdAt: new Date().toISOString()
        }
        //pass in the input object we just created
        await API.graphql(graphqlOperation(createPost, {input}));

        //After sending the data we want to clean up.
        this.setState({
            postTitle:"",
            submission:""
        })
    }
 
    render(){
        return(
            <div className="Submit border-left border-right">
                <div className="submitPost">
                <input onChange={this.handleTermChange} onKeyPress={this.onKeyUp} type="text" className="post" placeholder="What's happening?" required value={this.state.submission}/> 
                <button onClick={this.handleSubmission} className="submitButton">Submit</button>
               
                </div>
            </div>
        );
    }
}
*/

export default Submit;