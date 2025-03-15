import axios from "axios";
import { useNavigate } from "react-router-dom";

export const getDepartment = async () => {
   let departments = [];

       try {
         const response = await axios.get('http://localhost:3000/api/department',{
          headers:{
             "Authorization": `Bearer ${localStorage.getItem('token')}`
          }
         })
         
         if(response.data.success){
          departments = response.data.departments;
         }
       } catch (error) {
        if(error.response && !error.response.data.success) {
          alert(error.response.data.error)
        }
       } 
       return departments;
      }

    

    

