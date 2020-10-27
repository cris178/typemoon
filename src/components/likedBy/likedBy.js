import { render } from '@testing-library/react';
import React,{useState,useEffect} from 'react';
import './likedBy.css';

function LikedBy(props){
    const [liked, setLiked] = useState([]);
    useEffect(()=>{
        setLiked(props.liked);
    },[props.liked])

    let style = {padding: '10px'};
    if(liked.length === 0){
        style = {padding: '0px'};
    }
    return(
        <div className="LikedBy">
            <ul>
                {liked.map((like,index)=>{
                    return(<li key={index} style={style}>{like}</li>)
                })}
            </ul>
        </div>
    );
}

export default LikedBy;