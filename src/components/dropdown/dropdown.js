import React from 'react';
import './dropdown.css';
import {API, graphqlOperation} from 'aws-amplify';
import { deletePost } from '../../graphql/mutations';
import { UsernameAttributes } from 'aws-amplify-react';
//dropdown added
class DropDown extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            listOpen: false,
            options:[],
            postOwnerId: '',
            postOwnerUsername: '',
        }
        this.handleDeletePost = this.handleDeletePost.bind(this);
        this.handleEditPost = this.handleEditPost.bind(this);
    }

    async componentWillMount(){
      const setOptions = ["Delete","Edit","Share"];
      /*await Auth.currUserinfo().then(user => {
        this.setState({
          postOwnerId: user.attributes.sub,
          postOwnerUsername: user.username,
          listOpen: this.props.clicked,
          options: setOptions
        });
      })*/
      this.setState({
        listOpen: this.props.clicked,
        options: setOptions
      })
    }

    handleDeletePost = async postID => {
      console.log("Deleting: " + postID);
      const input = {
        id: postID
      }
      //input needs to be passed in as an object
      await API.graphql(graphqlOperation(deletePost, {input}));
    }

    handleEditPost = async postID =>{
      console.log("Editing Post: "+ postID);
      /*const input = {
        id: postID
      }

      await API.graphql(graphqlOperation(editPost,{input}));*/
    }

    handleOption = async selection =>{
      if(selection === "Delete"){
        this.handleDeletePost(this.props.postID);
      }else if(selection === "Edit"){
        this.handleEditPost(this.props.postID);
      }
    }
    //fixed
    render(){
       console.log("ID: " + this.props.postID);
        return(
            <div className="dropdown" style={this.props.style}>
              <ul>
                {this.state.options.map((option,index)=>{
                  return(<li key={index} onClick={()=>{ this.handleOption(option)}} ><a>{option}</a></li>)
                })}
              </ul>
            </div>
        );
    }
}

export default DropDown;