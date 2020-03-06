import React, { Component } from "react";
import axios from "axios";
/* import $ from "jquery"; */
import "bootstrap/dist/js/bootstrap.bundle";
class FetchData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      isLoading: true,
      error: null,
      question_id: null
    };
  }
  fetchData = () => {
    axios
      .get(
        "https://api.stackexchange.com/2.2/questions?order=desc&sort=activity&site=stackoverflow&filter=!b1MMEU)j2D*uc1"
      )
      .then(response => {
        this.setState({ items: response.data.items, isLoading: false });
      })
      .catch(error => {
        console.log(error);
        this.setState({ error: error, isLoading: false });
      });
  };

  componentDidMount() {
    this.fetchData();
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
            {items.map(data => {
              return (
                <div
                  key={data.question_id}
                  className="card mb-3"
                  data-toggle="modal"
                  data-target="#ansModal"
                  onClick={() =>
                    this.setState({ question_id: data.question_id })
                  }
                >
                  <div className="card-body">
                    <h5 className="m-0">{data.title}</h5>
                  </div>
                </div>
              );
            })}
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
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="ansModalLabel">
                  Modal title
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">{this.state.question_id}</div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
                <button type="button" className="btn btn-primary">
                  Save changes
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
