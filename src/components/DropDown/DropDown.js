import React from 'react';

class DropDown extends React.Component(){
    constructor(){
        super(props);
        this.state ={
            listOpen: false
        }
    }

    handleClickOutside(){
        this.setState({
          listOpen: false
        })
      }
      toggleList(){
        this.setState(prevState => ({
          listOpen: !prevState.listOpen
        }))
      }
    render(){
        return(
            <div className="DropDown">
              
            </div>
        );
    }
}

export default DropDown;