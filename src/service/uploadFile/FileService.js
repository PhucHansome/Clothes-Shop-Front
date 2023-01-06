import axios from "axios";

class FileService {
  static upload(file) {
    const CLOUD_NAME = "phucnguyenksqt11";
    const UPLOAD_API = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "jmy22br3");
    return axios.post(UPLOAD_API, formData);
  }
}


export default FileService;
