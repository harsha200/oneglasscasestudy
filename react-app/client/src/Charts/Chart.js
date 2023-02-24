import React from "react";
import Salesvtemp from "./Graphs/salesvtemp";
import Alerts from "./Graphs/Alerts";
function ManagementCards(){
    return(
        //salesvtemp - Bar and line graph
        //Alerts - List of items
        <div style={{display:'flex', justifyContent:'center', alignItems:'center', height:'80vh'}}>
            <div style={{textAlign: 'center'}}>
                <Salesvtemp/>
            </div>
            <div style={{textAlign: 'center'}}>
                <Alerts/>
            </div>
        </div>
    );
}
export default ManagementCards