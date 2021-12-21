import React, { useState, useEffect, Component } from "react";
//import ResourcesService from "../services/ResourcesService";

const MatchResultsForm = (props) => {
  const [update, setUpdate] = useState({
    id: props.match.params.id,
    content: "",
    shortDescription: "",
    title: "",
  });

  useEffect(() => {
    // if (update.id === "_dto") {
    //   return;
    // } else {
    //   ResourcesService.getResourceId(update.id).then((res) => {
    //     setUpdate({
    //       content: res.data.content,
    //       shortDescription: res.data.shortDescription,
    //       title: res.data.title,
    //     });
    //   });
    // }
  }, []);

  const saveDataUpdate = () => {
    // let jsonData = {
    //   content: update.content,
    //   shortDescription: update.shortDescription,
    //   title: update.title,
    // };
    // console.log(jsonData)
    // if (update.id === "_dto") {
    //   ResourcesService.createNewResource(jsonData).then((res) => {
    //     props.history.push("/");
    //   });
    // } else {
    //   ResourcesService.updateResource(jsonData, update.id).then((res) => {
    //     props.history.push("/");
    //   });
    // }
    props.history.push("/");
  };

  useEffect(() => {
    //saveDataUpdate();
  }, []);

  const cancel = () => {
    props.history.push("/");
  };

  const getTitle = () => {
    if (update.id === "_dto") {
      return <h3 className="text-center">Adding Data</h3>;
    } else {
      return <h3 className="text-center">Updating Data</h3>;
    }
  };

  return (
    <div>
      <br />
      <div className="container">
        <div className="row">
          <div className="card col-md-6 offset-md-3 offset-md-3">
            {getTitle()}
            <div className="card-body">
              <form>
                <div className="form-group">
                  <label> Content </label>
                  <input
                    placeholder="Content"
                    name="content"
                    className="form-control"
                    value={update.content}
                    onChange={(e) => setUpdate({ content: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label> Short Description </label>
                  <input
                    placeholder="Short Description"
                    name="shortDescription"
                    className="form-control"
                    value={update.shortDescription}
                    onChange={(e) =>
                      setUpdate({ shortDescription: e.target.value })
                    }
                  />
                </div>

                <div className="form-group">
                  <label> Title </label>
                  <input
                    placeholder="Title"
                    name="title"
                    className="form-control"
                    value={update.title}
                    onChange={(e) => setUpdate({ title: e.target.value })}
                  />
                </div>
                <br />

                <button className="btn btn-success" onClick={saveDataUpdate}>
                  Save
                </button>

                <button
                  style={{ marginLeft: "15px" }}
                  className="btn btn-secondary"
                  onClick={cancel}
                >
                  Cancel
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchResultsForm;
