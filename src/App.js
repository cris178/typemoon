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
import { onCreateComment, onCreatePost, onDeletePost, onUpdatePost } from './graphql/subscriptions';






function App() {
  //use state is a hook that sets any variable as our state. The only arguement passed to the useState is the initial state.
  const  [posts, setPosts] = useState([]);
  const [showEdit, setShowEdit] = useState(false);
  const [editBody,setEditBody] = useState('');
  const [editPostID, setEditPostID] = useState('');
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
      const deletePostListener =  API.graphql(graphqlOperation(onDeletePost))
        .subscribe({
          next: postData =>{
            console.log('Delete Listener working!')
            const deletedPost = postData.value.data.onDeletePost;
            const updatedPosts = posts.filter(post => post.id !== deletedPost.id);
            setPosts(updatedPosts); 
          }
        });

        //Listner to edit posts!
        const updatePostListener = API.graphql(graphqlOperation(onUpdatePost))
          .subscribe({
            next: postData =>{
            console.log("updatePost Listner!");
            const updatePost = postData.value.data.onUpdatePost;
            console.log("The updated post that will replace onld content: " + updatePost.id);
            const index = posts.findIndex(post => post.id === updatePost.id);
            const updatePosts = [...posts.slice(0,index), updatePost, ...posts.slice(index + 1)]; //Puts the updated post in the middle of any content before it or after it
            setPosts(updatePosts);
            hideModal();
          }
        });
        //
        const createPostCommentListener = API.graphql(graphqlOperation(onCreateComment))
        .subscribe({
          next: commentData =>{
            const createdComment = commentData.value.data.onCreateComment;
            let postsTemp = [...posts]; //Grab a copy of all of our posts
            for(let post of postsTemp){ //iterate through each post see if new comment belongs to a specific post.
              if(createdComment.post.id = post.id){
                post.comments.items.push(createdComment);
              }
            }
            setPosts(postsTemp);
          }
        })

    //We need to unsubscribe to avoid memory leaks
    return() =>{
      createPostListener.unsubscribe();
      deletePostListener.unsubscribe();
      updatePostListener.unsubscribe();
      createPostListener.unsubscribe();
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

  function showEditModal(val,body){
    setShowEdit(true);
    setEditBody(body);
    setEditPostID(val);
    console.log("On edit Click should receive posts ID: " + val);
    console.log("Body of post being edited: " + body);
  }

  function hideModal(){
    setShowEdit(false);
    console.log("Leaving EditPost");
  }
  
  return (
    <div className="App">

    <Context.Provider value={{user,setUser}}>

    {
      //The modal that will show based on edit state
      showEdit && (
        <EditPost hideModal={hideModal} body={editBody} id={editPostID}/>
      )
        
    }

     <nav>
        <div className="logo">TypeMoon</div>
     </nav>

      <div className="container">
          <div className="timeline">
                <Submit />
                <div className="timelinePosts">
                {posts.map((post,index)=>{
                  //return(<Posts key={index} postText={post}/>);
                  return(<Posts key={index} title={post.postTitle} body={post.postBody} userName = {post.postOwnerUsername} date={post.createdAt} postID={post.id} comments={post.comments} handleModal={showEditModal}/>);
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
