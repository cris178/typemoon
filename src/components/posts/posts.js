import React, {useEffect, useState, useContext} from 'react';
import './posts.css';
import DropDown from '../dropdown/dropdown';
import Comments from '../comments/comments';
import CreateCommentPost from '../comments/createCommentPost';
import { createComment } from '../../graphql/mutations';

function Posts (props){
    const [optionsClicked,setOptionsClicked] = useState(false);
    const [commentsVisibility, setCommentsVisibility] = useState(false);
    const [body, setBody] = useState("");

    useEffect(()=>{
        setBody(props.body);
        setOptionsClicked(false);
    },[props.body]);

    function setClick(){
        setOptionsClicked(!optionsClicked);
    }

    function showComments(value){
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

    return(
        <div className="Posts">
            <div className="metaData">
                <div className="PostsUser">{props.userName}</div>  
                <time>{" "} {new Date(props.date).toDateString()}</time>
            </div>
            <div className="PostText">
                {props.title}
                {body}
            </div>

            <div className="postActions">
                <div className="reply">Reply</div>
                <Comments handleComments={showComments}/>
                <div className="likes">Likes</div>
                <div onClick={setClick}className="dropdownIcon">+</div>
                <DropDown style={optionStyle}  postID={props.postID} clicked={optionsClicked} handle={(val)=>{setOptionsClicked(false); props.handleModal(val,props.body);}}></DropDown>
            </div>

            {
                commentsVisibility && (
                <CreateCommentPost />
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