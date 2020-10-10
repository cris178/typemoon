import React,{useEffect, useState, createContext} from 'react';
import './App.css';
import Submit from './components/submit/submit';
import Posts from './components/posts/posts';
import {withAuthenticator} from 'aws-amplify-react';
import {Context} from './context';



//import two apis API for communicating with appsync API.graohql
//graphQL operation lets us wrap queries below it and wrap it in a function
import Amplify, { API, graphqlOperation } from 'aws-amplify';


//Import mutations and queriries 
import {listPosts} from './graphql/queries';
import { ConfirmSignUp } from 'aws-amplify-react';
import { onCreatePost, onDeletePost } from './graphql/subscriptions';






function App() {
  //use state is a hook that sets any variable as our state. The only arguement passed to the useState is the initial state.
  const  [posts, setPosts] = useState([]);
  const [showEdit, setEdit] = useState(false);
  const [user,setUser] = useState(null);
  //const Context = createContext(posts);

  //useEffect is pretty much component did mount. We will call a function to retrieve existing posts
  useEffect(()=>{
    //getData()
    getPosts()
  },[]); //// Only re-run the effect if posts changes


  //UseEffect seperate just for subsctiption
  useEffect(()=>{
    //In regular componentdidmount we would have to use this.createPostListener instead of a variable
    const createPostListener = API.graphql(graphqlOperation(onCreatePost))
      .subscribe({
        next: postData =>{
          const newPost = postData.value.data.onCreatePost;
          const prevPosts = posts.filter(post => post.id !== newPost.id);
          //concatenate both post arrays
          const updatedPosts = [newPost, ...prevPosts];
          setPosts(updatedPosts);
        }
      });

      //This is another subscription but for deleting posts! This will autmatically remove posts instead of having to refresh
      const deletePostListener = API.graphql(graphqlOperation(onDeletePost))
        .subscribe({
          next: postData =>{
            const deletedPost = postData.value.data.onDeletePost;
            const updatedPosts = posts.filter(post => post.id !== deletedPost.id);
            setPosts(updatedPosts); 
          }
        });

    //We need to unsubscribe to avoid memory leaks
    return() =>{
      createPostListener.unsubscribe();
      deletePostListener.unsubscribe();
    };
  });

  async function getPosts(){
    const result = await API.graphql(graphqlOperation(listPosts));//graphql() is a promise
    console.log("All posts: ", JSON.stringify(result.data.listPosts.items));
    setPosts(result.data.listPosts.items);

    //Temp data to not pass AWS limit
    /*const getPost = [
      {postTile: "Title of post", postBody: "This is a long form post. It should carry out the limit of characters in the text. This is a test to see how to restrict the box size.", postOwnerUsername:"Testing Terry",updatedAt:"2020-09-27T06:20:30.296Z"},
      {postTile: "Title of post", postBody: "This is a long form post. It should carry out the limit of characters in the text. This is a test to see how to restrict the box size.", postOwnerUsername:"Testing Terry",updatedAt:"2020-09-27T06:20:30.296Z"},
      {postTile: "Title of post", postBody: "This is a long form post. It should carry out the limit of characters in the text. This is a test to see how to restrict the box size.", postOwnerUsername:"Testing Terry",updatedAt:"2020-09-27T06:20:30.296Z"},
      {postTile: "Title of post", postBody: "This is a long form post. It should carry out the limit of characters in the text. This is a test to see how to restrict the box size.", postOwnerUsername:"Testing Terry",updatedAt:"2020-09-27T06:20:30.296Z"}]
    console.log("Dummy Data: " + getPost);
    setPosts(getPost);*/
  }

  async function sendPost(){

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


     <Context.Provider value={{user,setUser}}>
      {
        //The modal that will show based on edit state
        showEdit && (
          <div className="editModal">
            <button className="editModalButton" onClick={this.handleModal}>
            </button>
          </div>
        )
          
      }
      <div className="container">
          <div className="timeline">
                <Submit />
                <div className="timelinePosts">
                {posts.map((post,index)=>{
                  //return(<Posts key={index} postText={post}/>);
                  return(<Posts key={index} title={post.postTitle} body={post.postBody} userName = {post.postOwnerUsername} date={post.createdAt} postID={post.id}/>);
                })}
                  
                </div>      
            </div>
      </div>
     </Context.Provider>



    </div>
  );
}


//export default App;
//Can set second arguement to false to remove greeting
export default withAuthenticator(App,false);
//export default withAuthenticator(App,{includeGreetings:true});
