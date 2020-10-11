import React,{useEffect, useState, createContext} from 'react';
import './App.css';
import Submit from './components/submit/submit';
import Posts from './components/posts/posts';
import EditPost from './components/editPost/editPost';
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
  const [showEdit, setShowEdit] = useState(false);
  const [user,setUser] = useState(null);
  
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
    /*const result = await API.graphql(graphqlOperation(listPosts));//graphql() is a promise
    console.log("All posts: ", JSON.stringify(result.data.listPosts.items));
    setPosts(result.data.listPosts.items);*/

    //Temp data to not pass AWS limit
    const getPost = [
      {postTile: "Title of post", postBody: "This is a long form post. It should carry out the limit of characters in the text. This is a test to see how to restrict the box size.", postOwnerUsername:"Testing Terry",updatedAt:"2020-09-27T06:20:30.296Z"},
      {postTile: "Title of post", postBody: "This is a long form post. It should carry out the limit of characters in the text. This is a test to see how to restrict the box size.", postOwnerUsername:"Testing Terry",updatedAt:"2020-09-27T06:20:30.296Z"},
      {postTile: "Title of post", postBody: "This is a long form post. It should carry out the limit of characters in the text. This is a test to see how to restrict the box size.", postOwnerUsername:"Testing Terry",updatedAt:"2020-09-27T06:20:30.296Z"},
      {postTile: "Title of post", postBody: "This is a long form post. It should carry out the limit of characters in the text. This is a test to see how to restrict the box size.", postOwnerUsername:"Testing Terry",updatedAt:"2020-09-27T06:20:30.296Z"}]
    console.log("Dummy Data: " + getPost);
    setPosts(getPost);
  }

  function showEditModal(val){
    setShowEdit(true);
    console.log("On edit Click should receive posts ID: " + val);
  }

  function hideModal(){
    setShowEdit(false);
    console.log("Leaving EditPost");
  }
  
  return (
    <div className="App">
    {
      //The modal that will show based on edit state
      showEdit && (
        <EditPost hideModal={hideModal}/>
      )
        
    }
     <nav>
        <div className="logo">TypeMoon</div>
     </nav>


     <Context.Provider value={{user,setUser}}>
      <div className="container">
          <div className="timeline">
                <Submit />
                <div className="timelinePosts">
                {posts.map((post,index)=>{
                  //return(<Posts key={index} postText={post}/>);
                  return(<Posts key={index} title={post.postTitle} body={post.postBody} userName = {post.postOwnerUsername} date={post.createdAt} postID={post.id} handleModal={showEditModal}/>);
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
