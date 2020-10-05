import { API, graphqlOperation,Auth } from 'aws-amplify';
import {createPost} from '../../graphql/mutations';
import React from 'react';
import './submit.css';


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

    componentDidMount = async  () =>{
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
                {/*<hr></hr>*/}
                </div>
            </div>
        );
    }
}


export default Submit;