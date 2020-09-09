import React from 'react';
import './submit.css';


class Submit extends React.Component{

    constructor(props){
        super(props);
        this.state ={
            submission: ""
        }
        this.handleTermChange = this.handleTermChange.bind(this);
        this.handleSubmission = this.handleSubmission.bind(this);
    }


    handleTermChange(event){
        console.log(event.target.value);
        this.setState({
            submission:event.target.value
        })
    }

    handleSubmission(){

    }

    render(){
        return(
            <div className="Submit border-left border-right">
                <div className="submitPost">
                <input onChange={this.handleTermChange} type="text" className="post" placeholder="What's happening?" /> 
                <button onClick={this.handleSubmission} className="submitButton">Submit</button>
                <hr></hr>
                </div>
            </div>
        );
    }
}


export default Submit;