import React, { useEffect, useState} from "react";

import Chart from 'react-apexcharts';
import {Card, Col, Form, Row} from "react-bootstrap";
import axios from "axios";
import {rootURL} from "../../constants";
import moment from "moment/moment";

const Salesvtemp = () => {
    const [weatherData, setWeatherData] = useState([]);
    const [forecastedData, setForcastedData] = useState([]);
    const [refresh, setRefresh] = useState(true);
    const [labels, setLabels] = useState([]);

    const[chartInfo, setChartInfo] = useState({

        series:[
            {
                name: 'Forecasted Sales',
                type: 'column',
                data: forecastedData
            }, {
                name: 'Temperature',
                type: 'line',
                data: weatherData
            }

        ],
        options: {
            chart: {
                height: 350,
                type: 'line',
            },
            stroke: {
                width: [0, 4]
            },
            title: {
                text: 'Sales'
            },
            dataLabels: {
                enabled: true,
                enabledOnSeries: [1]
            },
            labels: labels,
            xaxis: {
                type: 'datetime'
            },
            yaxis: [{
                title: {
                    text: 'Forcasted Sales',
                },

            }, {
                opposite: true,
                title: {
                    text: 'Temperature'
                }
            }]
        },

    })

    const fetchData = (storeName) => {

       fetchSales(storeName);
       fetchWeather(storeName);

    }

    const fetchSales = (storeName)=>{

        axios.
        get(rootURL+"forecastedsales/",
            {
                params:{
                    store:storeName,
                }
            }
        )
            .then((response)=>{

                setLabelInfo(response.data);
                setRefresh(!refresh);
            })
    }

    const fetchWeather = (storeName) => {

        axios.
        get(rootURL+"weatherdata",
            {
                params:{
                    store:storeName,
                }
            }
        )
            .then((response)=>{

                setWeatherInfo(response.data["0"]);
                setRefresh(!refresh);
            })

    }

    const setLabelInfo= (responseData)=>{
        const arrayLabels = [];
        const arrayData = [];

        for(let key in responseData)
        {
            arrayLabels.push(moment(responseData[key].date).format('D'));
            arrayData.push(responseData[key].forecasted_sales_quantity);
        }
        setLabels(arrayLabels);
        setForcastedData(arrayData);
    }

    const setWeatherInfo = (responseData) =>{
        const arrayData = [];
        const arrayLabels = [];

        for(let key in responseData)
        {
            arrayLabels.push(moment(key).format('D'));
            arrayData.push(responseData[key]);
        }
        setLabels(arrayLabels);
        setWeatherData(arrayData);
    }

    useEffect(()=>{


        setChartInfo({
            series: [{
                name: 'Forecasted Sales',
                type: 'column',
                data: forecastedData
            }, {
                name: 'Temperature',
                type: 'line',
                data: weatherData
            }],
            options: {
                chart: {
                    height: 350,
                    type: 'line',
                },
                stroke: {
                    width: [0, 4]
                },
                title: {
                    text: 'Sales'
                },
                dataLabels: {
                    enabled: true,
                    enabledOnSeries: [1]
                },
                labels: labels,
                xaxis: {
                    type: 'number'
                },
                yaxis: [{
                    title: {
                        text: 'Forcasted Sales',
                    },
                    labels: {
                        formatter: function (value) {
                            return value.toFixed(2);
                        }
                    }

                }, {
                    opposite: true,
                    title: {
                        text: 'Temperature'
                    },
                    labels: {
                        formatter: function (value) {
                            return value.toFixed(2);
                        }
                    }
                }]
            },
            },
        );
    },[refresh]);

    return(

        <div style={{marginLeft: '50px', marginRight: '30px'}}>
            <Row>
                <Col>
                    <Card style={{borderColor: '#3134eb', borderRadius: '15px', boxShadow: '1px 2px 9px ' + '#61b546', width:'50%'}}>
                        <Card.Body>
                            <Row>
                                <Col sm={7}>
                                    <h1>Forecasted Sales v/s Temperature</h1>
                                </Col>
                                <div style={{display: 'flex'}}>
                                    <div style={{marginLeft: '50px', marginRight: '30px'}}>
                                        <Form.Group>
                                            <Form.Select
                                                onChange={(e) => fetchData(e.target.value)}
                                            >
                                                <option>Select Store</option>
                                                <option value={'Munich'}>Munich</option>
                                                <option value={'Hamburg'}>Hamburg</option>
                                            </Form.Select>
                                        </Form.Group>
                                    </div>
                                </div>
                            </Row>

                            <Chart options={chartInfo.options} series={chartInfo.series} type={"line"} width={900} height={400}/>
                        </Card.Body>

                    </Card>
                </Col>
            </Row>
        </div>

    )
}

export default Salesvtemp;