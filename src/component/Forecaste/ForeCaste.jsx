import { Card, CardContent, Typography, Grid, Box, Divider } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import 'chart.js/auto';
import WeatherGraph from "../WeatherGraph/WeatherGraph";
import { BounceLoader } from 'react-spinners'




export const WeatherForcaste = ({ city }) => {
    const [forecastData, setForecastData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    console.log(forecastData)

    const fetchForecastWeather = async (city) => {
        setLoading(true)
        try {
            const response = await axios.get(`https://api.weatherbit.io/v2.0/forecast/daily?key=c8cf4fe9861e45b1aad1ca097555ef43&city=${city}&days=7`);
            if (response.data.data && response.data.city_name.toLowerCase() === city.toLowerCase()) {
                setForecastData(response.data.data);
                setError(null);
            } else {
                throw new Error("Invalid city name");
            }
        } catch (error) {
            if (error.message === "Invalid city name") {
                setError("Failed to fetch forecast data. Please check the city name.");
            } else {
                setError("Something went wrong. Please try again later.");
            }

            setForecastData([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!city) {
            setError(" Please Provide city name.")
            // navigate("/");

        } else {
            fetchForecastWeather(city);
        }
    }, [city]);


    return (<>
        <Box sx={{ boxSizing: 'border-box', display: "flex", flexDirection: "column", alignItems: "center", width: "100%", padding: 2 }}>

            <Grid container spacing={2} justifyContent="center">

                {loading ? (
                    <Box sx={{ height: '80vh', display: 'flex', justifyContent: 'center', alignItems: "center" }}>
                        <BounceLoader color="#35c5c8" />
                    </Box>
                ) : error ? (
                    <Box sx={{ height: "80vh", width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', color: "red" }} >
                        <Typography variant="h5">
                            {error}
                        </Typography>
                    </Box>
                ) : (
                    <> 
                     <Box sx={{ width: "100%", mt: 2, pl: 2 }}>
                        <Typography variant="h5" color="textSecondary">Forecast for the Next 7 Days in {city}</Typography>
                    </Box>
                        {forecastData.map((day, index) => (

                            <Grid item key={index} xs={12} sm={6} md={4} lg={3}>

                                <Card sx={{ mb: 2 , boxShadow: '0 2px 1px rgb(211,211,211' }}>
                                    <CardContent>
                                        <Typography variant="subtitle1">{new Date(day.valid_date).toLocaleDateString()}</Typography>
                                        <Box display="flex" alignItems="center" justifyContent="space-between">

                                            <Typography variant="h4" component="div">
                                                {day.temp}°C
                                            </Typography>
                                            <img src={`https://www.weatherbit.io/static/img/icons/${day.weather.icon}.png`} alt={day.weather.description} style={{ width: 50, height: 50 }} />
                                        </Box>
                                        <Typography variant="body2" color="textSecondary">{day.weather.description}</Typography>
                                        <Divider sx={{ my: 1 }} />

                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                                            <Typography>RealFeel</Typography>
                                            <Typography sx={{ color: "gray" }}>{day.app_max_temp}°C</Typography>
                                        </Box>
                                        <Divider />
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                                            <Typography>Wind</Typography>
                                            <Typography sx={{ color: 'gray' }}>{day.wind_spd} km/h</Typography>
                                        </Box>
                                        <Divider />
                                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
                                            <Typography>Humidity</Typography>
                                            <Typography sx={{ color: 'gray' }}>{day.rh}%</Typography>
                                        </Box>
                                        <Divider />
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <Typography variant="body2">Precipitation</Typography>
                                            <Typography sx={{ color: "gray" }}>{day.pop}%</Typography>
                                        </Box>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))
                        }
                    </>
                )}
            </Grid>
        </Box>
        {forecastData.length > 0 && < WeatherGraph forecastData={forecastData} />}

    </>
    );
};
