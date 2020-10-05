import React from 'react';
import './dropdown.css';

//dropdown added
class DropDown extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            listOpen: false,
            options:[]
        }
    }

    componentDidMount(){
      const setOptions = ["Delete","Edit","Share"];
      this.setState({
        listOpen: this.props.clicked,
        options: setOptions
      });
    }
    //fixed
    render(){
        
        return(
            <div className="dropdown" style={this.props.style}>
              <ul>
                {this.state.options.map((option,index)=>{
                  return(<li key={index}><a>{option}</a></li>)
                })}
              </ul>
            </div>
        );
    }
}

export default DropDown;