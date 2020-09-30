import React from 'react';
import './dropdown.css';

//dropdown added
class DropDown extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            listOpen: false
        }
    }

    componentDidMount(){
      this.setState({
        listOpen: this.props.clicked
      });
    }
    //fixed
    render(){
      console.log("prop: "+ this.props.style.visibility)
        
        return(
            <div className="dropdown" style={this.props.style}>
              <ul>
                <li><a href="#">Delete</a></li>
                <li><a href="#">Edit</a></li>
                <li><a href="#">Share</a></li>
                <li><a href="#">Iconography</a></li>
              </ul>
            </div>
        );
    }
}

export default DropDown;