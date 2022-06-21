import React, { useState, useEffect, useRef } from "react";
import { Container, Row, Col } from "reactstrap";

const MatchResultsForm = (props) => {
  const [update, setUpdate] = useState({
    id: props.match.params.id,
    content: "",
    shortDescription: "",
    title: "",
  });
  const [selectedFile, setSelectedFile] = useState();
  const inputRef = useRef(null);

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

  const handleUploadImage = () => {
    // Assuming only image
    var file = inputRef.current.files[0];
    if (file != null) {
      var reader = new FileReader();
      var url = reader.readAsDataURL(file);

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
          }}
        >
          <Row>
            <form>
              <input
                ref={inputRef}
                type="file"
                name="user[image]"
                multiple="true"
                onChange={handleUploadImage}
              />
            </form>
          </Row>
          <Row>
            <form>
              <button onClick={runAI}>Run</button>
            </form>
          </Row>
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
          <img src={selectedFile} style={{ maxHeight: "300px" }} />
        </Col>
      </Row>
    </Container>
  );
};

export default MatchResultsForm;
