import React, { Component } from "react";
import axios from "axios";
/* import $ from "jquery"; */
import "bootstrap/dist/js/bootstrap.bundle";
import AnsList from './ansList'
import OwnerDetails from "./owner"
import InfiniteScroll from 'react-infinite-scroller';
class FetchData extends Component {
  constructor(props) {
    super(props);
    this.viewDetails = this.viewDetails.bind(this);
    this.viewAns = this.viewAns.bind(this);
    this.state = {
      items: [],
      isLoading: true,
      error: null,
      question_id: null,
      pageNumber: 1,
      pageitems: 15,
      questions:[]
    };
  }
  fetchData = () => {
    axios
      .get(
        `https://api.stackexchange.com/2.2/questions?page=${this.state.pageNumber}&pagesize=${this.state.pageitems}&order=desc&sort=activity&site=stackoverflow&filter=!b1MMEU)j2D*uc1`
      )
      .then(response => {
        this.setState({
          //updating data
          items: [...this.state.items, ...response.data.items],
          //updating page numbers
          pageNumber: this.state.pageNumber + 1,
          isLoading: false
        })
        // this.setState({ items: response.data.items, isLoading: false });
      })
      .catch(error => {
        console.log(error);
        this.setState({ error: error, isLoading: false });
      });
    };
    
    componentDidMount() {
      this.fetchData();
    }
    viewDetails(qusId){
      // console.log(this.state.items)
      var result = this.state.items.filter(function(obj, index){
        return obj.question_id === qusId;
      })
      this.setState({questions:result[0]})
      console.log(this.state.items)
    
  }
  viewAns = (ans) => {
    if(ans){
      return ans.map((object, i) => {
        console.log(object)
        return <AnsList key={i  } index={i} obj={object} ></AnsList>
    })
    }else{
      return <div className="mt-4 border-top pt-3" role="alert">
          Sorry No Answare available
    </div>
    }

  }

  render() {
    const { items, isLoading, error } = this.state;
    return (
      <React.Fragment>
        {error && "The error is: " + error}
        {isLoading ? (
          <h4
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)"
            }}
          >
            Loading...
          </h4>
        ) : (
          <div className="container py-5">
              <InfiniteScroll
                pageStart={this.state.items.length}
                loadMore={this.fetchData}
                hasMore={true || false}
                loader={<div className="loader" key={0}>Loading ...</div>}
              >
                {items.map((data, i) => {
                  return (
                    <div
                      key={i}
                      className="card mb-3"

                    >

                      <div className="card-body">
                        <h5 className="m-0 mb-3" data-toggle="modal"
                          data-target="#ansModal"
                          onClick={() => this.viewDetails(data.question_id)}>{data.title}</h5>
                        <OwnerDetails obj={data.owner}></OwnerDetails>
                      </div>
                    </div>
                  );
                })}
              </InfiniteScroll>
            
          </div>
        )}
        <div
          className="modal fade"
          id="ansModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="ansModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-xl modal-dialog-scrollable modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header bg-light py-2">
                <h6 className="modal-title" id="ansModalLabel">
                {this.state.questions.title}
                </h6>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                  <div className="p-2 mb-3 border ">                  
                    {/* <div className="d-flex mb-3">
                      <img src={this.state.questions.owner.profile_image} style={{ height: '30px' }} alt=""></img>
                      <div>
                        <a target="_blank" className="ml-3" href={this.state.questions.owner.link} rel="noopener noreferrer">{this.state.questions.owner.display_name}</a>
                      </div>
                    </div> */}
                    {/* {this.state.questions.} */}
                    {/* <img src={this.state.questions.owner.link} style={{ height: '30px' }} alt=""></img> */}
                    {this.state.questions.owner && <OwnerDetails obj={this.state.questions.owner}></OwnerDetails>}
                    
                    <div className="p-2 bg-light">
                      <div dangerouslySetInnerHTML={{ __html: this.state.questions.body }} />
                    </div>
                  </div>
                 
                   {this.viewAns(this.state.questions.answers)}
                </div>
              <div className="modal-footer py-1 bg-light">
                <button
                  type="button"
                  className="btn btn-sm btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
               
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default FetchData;
