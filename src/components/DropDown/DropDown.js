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
        
        return(
            <div className="dropdown" style={this.props.style}>
              <ul>
                <li><a>Delete</a></li>
                <li><a>Edit</a></li>
                <li><a>Share</a></li>
                <li><a>Iconography</a></li>
              </ul>
            </div>
        );
    }
}

export default DropDown;