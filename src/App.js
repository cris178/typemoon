import React,{useEffect,useReducer} from 'react';
import './App.css';
import Submit from './components/submit/submit';

import uuid from 'uuid/v4'


//import two apis API for communicating with appsync API.graohql
//graphQL operation lets us wrap queries below it and wrap it in a function
import Amplify, { API, graphqlOperation } from 'aws-amplify'
//Import mutations and queriries 
import { createBlog as CreateBlog } from './graphql/mutations'
import { listPosts as ListPosts} from './graphql/queries'



import awsExports from "./aws-exports";
import { getDefaultNormalizer } from '@testing-library/react';
Amplify.configure(awsExports);




const CLIENT_ID = uuid();


//Useeffect is essentially component did mount


const initialState = {
  id:"0e42fc20-09e0-4e5b-8bfa-16a88d177bdf",
  name:"",
  title:"",
  createdAt:"",
  posts:[]
}

//Pass in the action(some vlaue) and the current state
function reducer(state, action){
 switch(action.type){
    case 'SET_POSTS': //Here we will pass in the data from the datapase and keep tack of all the posts with the action variable
      return {...state, posts: action.posts} 
    case 'SET_INPUT': //action.key will be the name of each form it will update the specific key in the state.
        return {...state, [action.key]:action.value}
    case 'CLEAR_INPUT': //Reset the state to the inital state but leave posts as is. Good for clearing the form data.
      return {...initialState, posts: state.posts}
    default:
      return state
  }
}


function App() {
  //We're going to set posts to an empty array in our state
  const [state, dispatch] = useReducer(reducer,initialState);

  //Using dispatch we will pass in objects with specific properties for the reducer. The object will have a type which will define the reducers actions

  //useEffect is pretty much component did mount. We will call a function to retrieve existing posts
  useEffect(()=>{
    getData()
  },[]);



  //LOOK AT LIST POST NOT GET POT
  async function getData(){
    try{
      const {id} = state;
      console.log("ID Destructured: "+ id);
      if(id===""){
        console.log("No valid account ID was provided")
        return;
      }
      const postData = await API.graphql(graphqlOperation(ListPosts,{blogID:"0e42fc20-09e0-4e5b-8bfa-16a88d177bdf"}));
      console.log('getBlog: ' + Object.keys(postData.data.listPost));
      console.log('getBlog: ' + postData.data.listPost);
      dispatch({type:'SET_POSTS', posts: postData.data.listPost.posts});
      console.log("Current State is: " + state.posts);
    }catch(err){
      console.log("Error fetching posts..." + err);
    }

  }


  return (
    <div className="App">
     <nav>
        <div className="logo">TypeMoon</div>
     </nav>
     <div className="container">
        <div className="timeline">
              <Submit />
                         
          </div>
     </div>
     

    </div>
  );
}

export default App;
