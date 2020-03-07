import React, { Component } from "react";
import OwnerDetails from "./owner"
class AnsList extends Component {
    // constructor(props) {
    //     super(props);
     
    //   }
    render() { 
        return ( <div className="p-2 mb-3 border ">
            <h6 className="mb-4">Answare {this.props.index + 1}</h6>
            <OwnerDetails obj={this.props.obj.owner}></OwnerDetails>          
            <div className="p-2 bg-light mt-3">
                <div dangerouslySetInnerHTML={{ __html: this.props.obj.body }} /> 
            </div>
        </div> );
    }
}
 
export default AnsList;