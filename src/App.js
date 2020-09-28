import React,{useEffect, useState} from 'react';
import './App.css';
import Submit from './components/submit/submit';
import Posts from './components/posts/posts';



//import two apis API for communicating with appsync API.graohql
//graphQL operation lets us wrap queries below it and wrap it in a function
import Amplify, { API, graphqlOperation } from 'aws-amplify';


//Import mutations and queriries 
import {listPosts} from './graphql/queries';





function App() {
  //use state is a hook that sets any variable as our state. The only arguement passed to the useState is the initial state.
  const  [posts, setPosts] = useState([]);

  //useEffect is pretty much component did mount. We will call a function to retrieve existing posts
  useEffect(()=>{
    //getData()
    getPosts()
  },[]);

  async function getPosts(){
    const result = await API.graphql(graphqlOperation(listPosts));//graphql() is a promise
    console.log("All posts: ", JSON.stringify(result.data.listPosts.items));
    setPosts(result.data.listPosts.items)
  }

  //LOOK AT LIST POST NOT GET POT
  /*
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
      const actualPost = [];
      for(let names of postData.data.listPosts.items){
        if(names.blogID === id){
          console.log("Iterating" + names.title);
          actualPost.push(names.title);
        }
      }
      dispatch({type:'SET_POSTS', posts: actualPost});
      //dispatch({type:'SET_POSTS', posts: postData.data.listPosts.items});
      console.log("Current State is: " + state.posts);
      console.log(Object.keys(state.posts));
    }catch(err){
      console.log("Error fetching posts..." + err);
    }

  }
  */
  
  return (
    <div className="App">
     <nav>
        <div className="logo">TypeMoon</div>
     </nav>
     <div className="container">
        <div className="timeline">
              <Submit />
              <div className="timelinePosts">
              {posts.map((post,index)=>{
                //return(<Posts key={index} postText={post}/>);
                return(<Posts key={index} title={post.postTitle} body={post.postBody} userName = {post.postOwnerUsername} date={post.createdAt}/>);
              })}
                
              </div>      
          </div>
     </div>
     

    </div>
  );
}

export default App;
