import React, { useState, useEffect, useRef, useId } from "react";
import { Container, Row, Col } from "reactstrap";
import { fireDatabase, storage } from "../../../config/firebaseConfig";

const MatchResultsForm = (props) => {
  const [update, setUpdate] = useState({
    id: props.match.params.id,
    content: "",
    shortDescription: "",
    title: "",
  });
  const imgId = useId();
  const [selectedFile, setSelectedFile] = useState();
  const inputRef = useRef(null);
  const fileUploadHandler = () => {
    if (selectedFile == null) return;
    const userInfo = JSON.parse(localStorage.getItem("user"));
    if (Object.keys(userInfo).length > 0) {
      storage
        .ref(`/${selectedFile.name}`)
        .put(selectedFile)
        .on(
          "state_changed",
          function progress(snapshot) {
            fireDatabase
              .ref(`/avatarLink/${userInfo.username}`)
              .set(
                `https://firebasestorage.googleapis.com/v0/b/plfirebase-cc1f1.appspot.com/o/${selectedFile.name}?alt=media`
              )
              .catch((error) => ({
                errorCode: error.code,
                errorMessage: error.message,
              }));
          },
          function error(err) {
            alert(err);
          },
          function complete() {
            alert("success");
          }
        );
    } else alert("Please Sign In");
  };

  const handleUploadImage = () => {
    // Assuming only image
    console.log(inputRef.current);

    let file = inputRef.current.files[0];
    if (file != null) {
      let reader = new FileReader();
      let url = reader.readAsDataURL(file);

      reader.onloadend = function (e) {
        setSelectedFile(reader.result);
      };
    }
  };

  const runAI = () => {};

  return (
    <Container>
      <Row style={{ height: "400px" }}>
        <Col
          sm="3"
          style={{
            backgroundColor: "black",
            padding: "20px",
            margin: "20px",
            border: "10px solid green",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
          }}
        >
          <div>
            <form style={{ display: "block" }}>
              <label
                htmlFor={imgId}
                style={{
                  border: "1px solid #ccc",
                  display: "inline-block",
                  padding: "6px 12px",
                  cursor: "pointer",
                  width: "100%",
                  textAlign: "center",
                }}
              >
                <i className="fa fa-cloud-upload"></i> Input Image
              </label>
              <input
                id={imgId}
                ref={inputRef}
                type="file"
                placeholder="Image Input"
                multiple={true}
                onChange={handleUploadImage}
                style={{ display: "none" }}
              />
            </form>
          </div>
          <div>
            <form>
              <button
                style={{ width: "100%", background: "white" }}
                onClick={runAI}
              >
                Run
              </button>
            </form>
          </div>
        </Col>
        <Col
          sm="7"
          style={{
            backgroundColor: "green",
            padding: "20px",
            margin: "20px",
            display: "flex",
            justifyContent: "center",
            border: "10px solid black",
            maxHeight: "100%",
          }}
        >
          <img
            src={selectedFile}
            style={{ maxHeight: "300px" }}
            alt="input-image"
          />
        </Col>
      </Row>
    </Container>
  );
};

export default MatchResultsForm;
