import React, { useState } from "react";
import { MdCloudUpload, MdCheckCircle, MdErrorOutline } from "react-icons/md";
import axios from "axios";
const Main = () => {
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFile = (event) => {
    setFile(event.target.files[0]);
    console.log(event.target.files[0]);
  };

  const handleUpload = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("excelFile", file);

    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:5000/excel-file/uploadData",
        formData
      );

      if (response.status === 200) {
        console.log("File uploaded successfully");
        setUploadStatus("success");
      } else {
        setUploadStatus("error");
        console.log("File upload failed");
      }
    } catch (error) {
      setUploadStatus("error");
      console.log("Error uploading file:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="main_div">
      <form onSubmit={handleUpload}>
        <label htmlFor="fileInput" className="sandbox">
          <input
            type="file"
            id="fileInput"
            name="excelFile"
            onChange={handleFile}
            style={{ display: "none" }}
          />
          {!uploadStatus && <MdCloudUpload size={80} />}
          {file ? <span>{file.name}</span> : <span>Upload excel file...</span>}
          {uploadStatus === "success" && (
            <div className="message_success">
              <MdCheckCircle size={36} />
              <span>File uploaded successfully!</span>
            </div>
          )}
          {uploadStatus === "error" && (
            <div className="error_message">
              <MdErrorOutline className="error" size={36} />
              <span>Error uploading file. Please try again.</span>
            </div>
          )}

          {loading && (
            <div className="loading_message">
              <span>Uploading...</span>
            </div>
          )}
        </label>
        {file && !uploadStatus && !loading && (
          <button type="submit">Submit</button>
        )}
      </form>
    </div>
  );
};

export default Main;
