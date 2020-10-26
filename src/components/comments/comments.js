import React,{useEffect, useState} from 'react';
import './comments.css'
import { propStyle } from 'aws-amplify-react';

function Comments(props) {
    
    const [style,setStyle] = useState();
    useEffect(()=>{
        setStyle({zIndex:props.zindex})
    },[props.zindex]);
  
   

    
        return(
            <div className="comments fadeIn" style={style}>
                <div className="metaData">
                    <div className="commentUser">{props.userName}</div>  
                    <time>{" "} {new Date(props.createdAt).toDateString()}</time>
                </div>
                <div className="commentText">
                    {props.content}
                </div>
            </div>
        );

}

export default Comments;