import React,{useEffect,useState} from 'react';
import './App.css';
import Submit from './components/submit/submit';


//import two apis API for communicating with appsync API.graohql
//graphQL operation lets us wrap queries below it and wrap it in a function
import Amplify, { API, graphqlOperation } from 'aws-amplify'
import { createPost } from './graphql/mutations'
import { listPosts } from './graphql/queries'

import awsExports from "./aws-exports";
import { getDefaultNormalizer } from '@testing-library/react';
Amplify.configure(awsExports);



//Useeffect is essentially component did mount
//UseState is to use state

function App() {
  //We're going to set posts to an empty array in our state
  const [posts, updatedPosts] = useState([]);

  useEffect(()=>{
    getData()
  },[]);

  async function getData(){
    try{
      const postData = await API.graphql(graphqlOperation(listPosts));
      console.log('postData: ' + postData);
      let info = Object.keys(postData);
      console.log(postData.data);
      updatedPosts(postData.data.listPosts.items);

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
