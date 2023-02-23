import {Card} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {rootURL} from "../../constants";


function Alerts(){

    const [selectValue, setSelectValue] = useState('default');
    const [alertData, setAlertData] = useState([]); //change the name descriptive names

    useEffect(() => {
        if (selectValue !== 'default') {
            // Make API call to fetch data based on select value
            axios.
            get(rootURL+"alerts",
                {
                    params:{
                        store:selectValue,
                    }
                }
            ).then((response)=>{
                applyData(response.data["0"]);
            })
        }
    }, [selectValue]); // specify about mounting phase of component

    const applyData = (responseData) => {

        setAlertData([]);

        if(responseData)
        {
            setAlertData(responseData);
        }

    }

    function handleSelectChange(event) {
        setSelectValue(event.target.value);
    }

    return (
        <div>
            <Card style={{borderColor: '#3134eb', borderRadius: '15px', boxShadow: '1px 2px 9px ' + '#61b546',marginLeft:'50px', marginTop:'20px', width:'48%'}}>
                <Card.Body>
            <label htmlFor="my-select">Select in dropdown to generate dates in which store can be closed:</label>
            <select id="select-store" value={selectValue} onChange={handleSelectChange}>
                <option value="default" disabled>Select an option</option>
                <option value="Munich">Munich</option>
                <option value="Hamburg">Hamburg</option>
            </select>
            {alertData.map((item) => (
                <li key={item}>{item}</li>
            ))}
                </Card.Body>
            </Card>
        </div>
    );

}

export default Alerts;