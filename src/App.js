import React,{useEffect,useReducer} from 'react';
import './App.css';
import Submit from './components/submit/submit';
import Posts from './components/Posts/Posts'

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
  id:"61075ae6-ef6b-48fd-a429-52ae8e7eb488",
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
      const postData = await API.graphql(graphqlOperation(ListPosts));
      console.log('getBlog: ' + Object.keys(postData.data.listPosts.items[0]));
      console.log('getBlog: ' + postData.data.listPosts.items[0].title);
      for(let names of postData.data.listPosts.items){
        if(names.blogID === id){
          console.log("Iterating" + names.title);
        }
      }
      dispatch({type:'SET_POSTS', posts: postData.data.listPosts.items});
      console.log("Current State is: " + state.posts);
      console.log(Object.keys(state.posts));
    }catch(err){
      console.log("Error fetching posts..." + err);
    }

  }

  console.log(state.posts)
  return (
    <div className="App">
     <nav>
        <div className="logo">TypeMoon</div>
     </nav>
     <div className="container">
        <div className="timeline">
              <Submit />
              <div className="timelinePosts">
                <Posts />
                <Posts />
                <Posts />  
              </div>      
          </div>
     </div>
     

    </div>
  );
}

export default App;
