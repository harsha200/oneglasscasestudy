import {Card} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {rootURL} from "../../constants";
import ErrorPage from "../../Error/ErrorPage";

function Alerts(){

    //Stores store information to fetch alerts
    const [selectValue, setSelectValue] = useState('default');

    //Alert dates which stores can be closed down
    const [alertData, setAlertData] = useState([]);

    //Flag to show loading content
    const [isLoading, setIsLoading] = useState(false);

    //Flag to show error page if any error happened in the backend
    const [isError, setIsError] = useState(false);

    //It will be triggered when the value changes in drop down
    useEffect(() => {
        if (selectValue !== 'default') {
            // Make API call to fetch data based on selected value (store name)
            try{
                axios.
                get(rootURL+"alerts",
                    {
                        params:{
                            store:selectValue,
                        }
                    }
                ).then((response)=>{
                    setIsError(false);
                    setIsLoading(false);
                    applyData(response.data["0"]);
                }).catch(()=>{
                    setIsError(true);
                    setIsLoading(false);
                })
            }
            catch(error)
            {
                setIsError(true);
                setIsLoading(false);
            }
        }
    }, [selectValue]); // specify about mounting phase of component

    //Setting the alert based on what we received from the backend
    const applyData = (responseData) => {

        setAlertData([]);

        if(responseData)
        {
            setAlertData(responseData);
        }

    }

    //when we hit store name in drop down this will set selectedvalue state
    const handleSelectChange = (event) => {
        setSelectValue(event.target.value);
        setIsLoading(true);
    }

    return (
        <div>
            <Card style={{borderColor: '#3134eb', borderRadius: '15px', boxShadow: '1px 2px 9px ' + '#61b546',marginLeft:'50px', width:'100%'}}>
                <Card.Body>
                    <div>
                        <h1>Store potential close dates</h1>
                    </div>
                    <div>
                        <select id="select-store" value={selectValue} onChange={handleSelectChange}>
                            <option value="default" disabled>Select an option</option>
                            <option value="Munich">Munich</option>
                            <option value="Hamburg">Hamburg</option>
                        </select>
                    </div>
                    <div>
                        {isLoading ? (
                            <p>Loading...</p>
                        ) : isError ? (
                            <ErrorPage />
                        ) :(
                            alertData.map((item) => (
                                <li key={item}>{item}</li>
                            )))}
                    </div>
                </Card.Body>
            </Card>
        </div>
    );

}

export default Alerts;