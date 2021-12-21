import React, {useEffect, useState} from "react";

const ImageUpload = (props) => {
    const fileSelectHandler = (event) => {
        console.log(event)
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
