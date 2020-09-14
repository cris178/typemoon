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
                <div className="PostsUser">Cristian</div>
                <div className="PostText">
                    {this.props.postText}
                </div>
            </div>
        );
    }
}

export default Posts;