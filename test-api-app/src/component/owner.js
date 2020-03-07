import React, { Component } from "react";

class OwnerDetails extends Component {
   
    render() { 
        return ( 
            <div className="d-flex">
                <img src={this.props.obj.profile_image} style={{ height: '30px' }} alt=""></img>
                <div>
                    <a target="_blank" className="ml-3" href={this.props.obj.link} rel="noopener noreferrer">{this.props.obj.display_name}</a>
                </div>
            </div>
         );
    }
}
 
export default OwnerDetails;