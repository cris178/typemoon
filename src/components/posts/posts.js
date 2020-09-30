import React from 'react';
import './posts.css';
import DropDown from '../dropdown/dropdown';



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
                    <div className="comments">See Comments</div>
                    <div className="likes">Likes</div>
                    <div onClick={this.setClick}className="dropdownIcon">"^"</div>
                    <DropDown style={style}  clicked={this.state.clicked}></DropDown>
                </div>
                
            </div>
        );
    }
}

export default Posts;