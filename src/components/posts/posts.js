import React from 'react';
import './Posts.css'

class Posts extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            
        }

    }
    render(){
        return(
            <div className="Posts">
                <div className="PostsUser">{this.props.userName}</div>
                <div className="PostText">
                    {this.props.title}
                    {this.props.body}
                </div>
                <time>{" "} {new Date(this.props.date).toDateString()}</time>
            </div>
        );
    }
}

export default Posts;