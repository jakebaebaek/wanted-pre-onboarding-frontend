import axios from "axios";

const API = 'https://www.pre-onboarding-selection-task.shop';
const access_token = localStorage.getItem("access_token");

function axiosGet(){
  var todoGet = {
    headers : {
      Authorization: `Bearer ${access_token}`
    }
  }
  
  axios.get(`${API}/todos`,
  todoGet)
    .then((res) => {
      console.log(res.data);
    }).catch((error) => {
      console.log(error);
    })
};
export default axiosGet;

