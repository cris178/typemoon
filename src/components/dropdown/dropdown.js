import React, {useState,useEffect, useContext} from 'react';
import './dropdown.css';
import {API, graphqlOperation, Auth} from 'aws-amplify';
import { deletePost } from '../../graphql/mutations';
import {Context} from '../../context';


function DropDown (props){
  const {user,setUser} = useContext(Context);
  const  [options, setOptions] = useState(["Delete","Edit","Share"]);
  const [view, setView] = useState({visibility: 'hidden'});
  //const  [user, setUser] = useState();
  useEffect(()=>{
    //getUser();
    setView(props.style);
    //clean up function runs before component destroyed
    return() =>{
      setView({visibility:'hidden'});
    }
  },[props.style]); //Dependency makes so that the useEffect runs every time the prop changes

  //Handle the Option Selected!
  async function handleOption (selection){
    if(selection === "Delete"){
      handleDeletePost(props.postID);
    }else if(selection === "Edit"){
      handleEditPost(props.postID);
    }
  }
  //Delete the post
  async function handleDeletePost(postID){
    console.log("Deleting: " + postID);
    const input = {
      id: postID
    }
    //input needs to be passed in as an object
    await API.graphql(graphqlOperation(deletePost, {input}));
  }

  async function handleEditPost(postID){
    console.log("Editing Post: " + postID);
    props.handle(postID);
  }
  /*
  if(props.style !== view){
    setView(props.style);
  }*/
  return(
    
    <div className="dropdown" style= {view}>
      <ul>
        {options.map((option,index)=>{
          return(<li key={index} onClick={()=>{ handleOption(option)}} ><a>{option}</a></li>)
        })}
      </ul>
    </div>
  );
}
/*
//dropdown added
class DropDown extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            listOpen: false,
            options:[],
            postOwnerId: '',
            postOwnerUsername: '',
            dropdownStyle:{ visibility: 'hidden'},
            show: false
        }
        this.handleDeletePost = this.handleDeletePost.bind(this);
        this.handleEditPost = this.handleEditPost.bind(this);
        this.handleModal = this.handleModal.bind(this);
    }

    async componentWillMount(){
      const setOptions = ["Delete","Edit","Share"];
      await Auth.currentUserInfo().then(user =>{
        this.setState({
          postOwnerId:user.attributes.sub,
          postOwnerUsername: user.username,
          listOpen: this.props.clicked,
          options: setOptions,
          dropdownStyle:{visibility: this.props.style}
        });
      });
      
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
      this.setState({
        show: true
      });
     
    }

    handleOption = async (selection) =>{
      if(selection === "Delete"){
        this.handleDeletePost(this.props.postID);
      }else if(selection === "Edit"){
        this.handleEditPost(this.props.postID);
      }
    }


    handleModal(){
      this.setState({
        show: !this.state.show //toggle
      })
      //Moves focus to top of screen.
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    }


    //fixed
    render(){
       console.log("Drop Down Data: ");
       console.log("List Open: " + this.state.listOpen);
       console.log("Options: " + this.state.options);
       console.log("Post OwnerID: " + this.state.postOwnerId);
       console.log("Username: " + this.state.postOwnerUsername);
       //console.log(Object.keys(this.state.visibility) + this.state.show)
        return(
            <div className="dropdown" style={this.state.dropdownStyle}>
              <ul>
                {this.state.options.map((option,index)=>{
                  return(<li key={index} onClick={()=>{ this.handleOption(option)}} ><a>{option}</a></li>)
                })}
              </ul>
            </div>
        );
    }
}*/

export default DropDown;