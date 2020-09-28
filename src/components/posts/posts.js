import React from 'react';
import './posts.css'

class Posts extends React.Component{
    
    render(){
        console.log("Data: " + this.props.date);
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
                    <div className="comments">See Comments</div>
                    <div className="likes">Likes</div>
                    <div className="dropdownPost">"^"</div>
                </div>
                
            </div>
        );
    }
}

export default Posts;