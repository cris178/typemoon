import React from 'react';
import './Posts.css'

class Posts extends React.Component{
    constructor(props){
        super(props);

    }
    render(){
        return(
            <div className="Posts">
                <div className="PostsUser">Cristian</div>
                <div className="PostText">
                    Hello World!
                </div>
            </div>
        );
    }
}

export default Posts;