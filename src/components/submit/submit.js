import React from 'react';
import './submit.css';


class Submit extends React.Component{
    render(){
        return(
            <div className="Submit border-left border-right">
                <div className="submitPost">
                <input type="text" className="post" placeholder="What's happening?" /> 
                <button className="submitButton">Submit</button>
                <hr></hr>
                </div>
            </div>
        );
    }
}


export default Submit;