import React, {useEffect, useState} from "react";

const ImageUpload = (props) => {
    const [selectedFile, setSelectedFIle] = useState(null)
    
    const fileSelectHandler = (event) => {
        console.log(event, event.target, event.target.files)
        setSelectedFIle(event.target.files[0])
    }

    return (
        <div className="">
            <input type="file" onChange={fileSelectHandler}/>
        </div>
    )
}
export default ImageUpload;

const style = {
    outBox = {
        marginTop: "30px",
        alignContent: "center"
    }
}
