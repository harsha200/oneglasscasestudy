import React from "react";
import Salesvtemp from "./Graphs/salesvtemp";
import Alerts from "./Graphs/Alerts";
function ManagementCards(){
    return(
        <div>
            <Salesvtemp/>
            <Alerts/>
        </div>
    );
}
export default ManagementCards