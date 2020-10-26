import React, {useEffect, useState, useContext} from 'react';
import './posts.css';
import DropDown from '../dropdown/dropdown';
import Comments from '../comments/comments';
import CreateCommentPost from '../comments/createCommentPost';
import Comment from '../comments/comments';
import { createComment, createLike } from '../../graphql/mutations';
import {Context} from '../../context';

//Icons
import {GoKebabHorizontal} from "react-icons/go";
import {GoHeart} from "react-icons/go";
import {GoComment} from "react-icons/go";
import {GoReply} from "react-icons/go";
import { API, graphqlOperation } from 'aws-amplify';



function Posts (props){
    const {user,setUser} = useContext(Context);
    const [optionsClicked,setOptionsClicked] = useState(false);
    const [commentsVisibility, setCommentsVisibility] = useState(false);
    const [body, setBody] = useState("");
    const [comments, setcomments] = useState([]);
    const [likes, setLikes] = useState([]);
    const [liked, setLiked] = useState({color:"white"});
    const [likeLength, setLikeLength] = useState(0);
    const [zindex,setZindex] = useState(0);
    const  [options, setOptions] = useState([]);

    useEffect(()=>{
        setBody(props.body);
        setOptionsClicked(false);
        
    },[props.body]);

    useEffect(()=>{
        setcomments(props.comments);
        setLikes(props.likes);
        setLikeLength(props.likes.items.length);
        console.log("Running comments update useeffect: " + props.comments.items.length);
    },[props.comments,props.likes]);

    function setClick(){
        setOptionsClicked(!optionsClicked);
        if(user.postOwnerUsername === props.userName){
            setOptions(["Delete", "Edit", "Share"]);
            console.log("Full authorization to user");
        }else{
            setOptions(["Share"]);
            console.log("Limited options");
        }
    }
    function displayComments(){
        return comments.items.map((comment,index)=>{
            //console.log("Inside: "+body+ " looking at comment " + Object.keys(comment));
            return(<Comment key={index} zindex={zindex - index} content={comment.content}  userName={comment.commentOwnerUsername}  createdAt={comment.createdAt} />)  
            //return(console.log())
        })
    }

    function likedPost(){
        for(let like of likes.items){
            if(like.likeOwnerUsername === user.postOwnerUsername){
                console.log("Already liked this post");
                return false;
            }
        }
        if(props.userName === user.postOwnerUsername){
            console.log("Can't like your own post!");
            return false;
        }
        //This post does not belong to the user and is the first time he is liking
        console.log("Liking the post!")
        setLiked({color: "pink"});
        return true;
        
    }

    async function handleLike(){
        if(likedPost() === true){ 
            console.log("Beginning Like");
            const input={
                numberLikes: 1,
                likeOwnerId: user.postOwnerId,
                likeOwnerUsername: user.postOwnerUsername,
                likePostId: props.postID
            };
            try{
                await API.graphql(graphqlOperation(createLike,{input}));
                //console.log("Liked: " + result.data)
            }catch(error){
                console.log(error);
            }
        }

    }

    function showComments(){
        console.log(commentsVisibility);
        setCommentsVisibility(!commentsVisibility);
    }

    let optionStyle;
    if(optionsClicked){
        optionStyle ={
            visibility: 'visible'
        }
    }else{
        optionStyle={
            visibility: 'hidden'
        }
    }

    if(props.likes.items.length > likeLength){
        setLikeLength(props.likes.items.length);
    }
    return(
        <div className="Posts fadeIn">
            <div className="metaData">
                <div className="PostsUser">{props.userName}</div>  
                <time>{" "} {new Date(props.date).toDateString()}</time>
            </div>
            <div className="PostText">
                {props.title}
                {body}
            </div>

            <div className="postActions">
                <div className="reply" onClick={showComments}><GoReply /></div>
                <div className="commentsButton" onClick={showComments}> <GoComment /> </div>
                <div className="likes" style={liked} onClick={handleLike}><GoHeart /> <div className="likeNumb">{likeLength}</div></div>
                <div onClick={setClick}className="dropdownIcon"><GoKebabHorizontal /></div>
                <DropDown style={optionStyle} options={options} userName ={props.userName} postID={props.postID} clicked={optionsClicked} handle={(val)=>{setOptionsClicked(false); props.handleModal(val,props.body);}}></DropDown>
            </div>

            {
                commentsVisibility && (
                    <div className="commentsList">
                        <CreateCommentPost postID={props.postID}/>
                        {displayComments()}
                    </div>
               )
            }
        </div>
    );
}

/*
class Posts extends React.Component{
     constructor(props){
         super(props);
         this.state = {
             clicked: false
         }
         this.setClick = this.setClick.bind(this);
     }

     setClick(){
         if(this.state.clicked === false){
             this.setState({
                 clicked: true
             });
         }else{
             this.setState({
                 clicked:false
             });
         }
     }
    
    render(){
        console.log("clicked: "+ this.state.clicked);
        console.log("Data: " + this.props.date);
        let style;
        if(this.state.clicked === true){
          style = {
              visibility: 'visible'
          };
        }else{
          style ={
              visibility: 'hidden'
          }
        }
        return(
            <div className="Posts">
                <div className="metaData">
                    <div className="PostsUser">{this.props.userName}</div>  
                    <time>{" "} {new Date(this.props.date).toDateString()}</time>
                </div>
                <div className="PostText">
                    {this.props.title}
                    {this.props.body}
                </div>

                <div className="postActions">
                    <div className="reply">Reply</div>
                    <Comments />
                    <div className="likes">Likes</div>
                    <div onClick={this.setClick}className="dropdownIcon">+</div>
                    <DropDown style={style}  postID={this.props.postID} clicked={this.state.clicked}></DropDown>
                </div>
                
            </div>
        );
    }
}
*/
export default Posts;