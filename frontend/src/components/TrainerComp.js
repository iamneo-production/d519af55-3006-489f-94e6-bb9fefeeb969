import React from 'react'
import { axiosInstance } from '../config';


const TrainerComp = (props) => {
  
    const handleDelete = async (e) => {
        try {
            const res = await axiosInstance.delete(`/admin/remove/${props.id}`);
            props.setTrigger(!props.trigger);
          } catch (error) {
            console.log(error.data.msg);
          }
    }

  return (
    <div className="row my-3">
        <div className="col-1">
            {props.id}
        </div>
        <div className="col-2">
            {props.name}
        </div>
        <div className="col-4">
            {props.email}
        </div>
        <div className="col-5">
            <button onClick={() => props.setUpdate({...props})}>Update/Edit</button>
            <span className="m-1"></span> 
            <button onClick={handleDelete}>Delete</button>
        </div>
     </div>
  )
}

export default TrainerComp