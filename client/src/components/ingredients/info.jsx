import { useEffect, useState } from "react";
import axios from "axios";

let URL = "http://127.0.0.1/api/ingredient/info";

//Get info component. 
const GetInfo = () => {
    const [info, setInfo] = useState([])

    useEffect(
        () => {
            axios.get(URL)
            .then(response => {return response.data})
            .then(data => {
                setInfo(data)
            })
        }
    ,[])
    
    return (
        <div>
            {
                info.map((ingredeientInfo) => (
                    <p key={ingredeientInfo.id}>
                        Name: {ingredeientInfo.name}
                        <br />
                        Description: {ingredeientInfo.description}
                        <br />
                        Cost: $ {ingredeientInfo.cost}
                        <br />
                        Comments: {ingredeientInfo.comments}
                        
                    </p>
                ))
            }
        </div>
    )
}




export default GetInfo;
