import axios from "axios";
import { useEffect, useState } from "react";
import { Card, CardContent, Typography, CircularProgress, Grid, Divider, Box } from "@mui/material";

import {BounceLoader} from 'react-spinners'
export const CurrentWeather = () => {
    const city = "Hyderabad";
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentWeatherData, setCurrentWeatherData] = useState(null);

    const fetchCurrentWeather = async (city) => {
        try {
            const response = await axios.get(`https://api.weatherbit.io/v2.0/current?key=c8cf4fe9861e45b1aad1ca097555ef43&city=${city}`);
            if (response.data.data && response.data.data[0] && response.data.data[0].city_name.toLowerCase() === city.toLowerCase()) {
                setCurrentWeatherData(response.data.data[0]);
                setError(null);
            } else {
                throw new Error("Invalid city name");
            }
        } catch (error) {
            if (error.message === "Invalid city name") {
                setError("Failed to fetch weather data. Please check the city name.");
            } else {
                setError("Something went wrong. Please try again later.");
            }
            setCurrentWeatherData(null);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchCurrentWeather(city);
    }, [city]);

    console.log(currentWeatherData)
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', p: 2, }}>
            <Grid container justifyContent="center" alignItems="center">
                {
                    loading ? (
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '79vh' }}>
                             <BounceLoader color="#35c5c8"  /> 
                        </Box>
                    ) : error ? (
                        <Typography color="error">{error}</Typography>
                    ) : (
                        <Grid item xs={12} sm={8} md={6}>
                            <Card sx={{ minWidth: 275, maxWidth: 600, m: 2, p: 2 }}>
                                <CardContent>
                                    <Typography variant="h5" gutterBottom>
                                        {city}
                                    </Typography>

                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                                        <Box>
                                            <Typography sx={{ fontSize: '2rem', fontWeight: 'bold' }}>
                                                {currentWeatherData.temp}°C
                                            </Typography>
                                            <Typography sx={{ mb: 1.5 }} color="textSecondary">
                                                RealFeel {currentWeatherData.app_temp}°C
                                            </Typography>
                                        </Box>

                                        <Box>
                                            <img
                                                src={`https://www.weatherbit.io/static/img/icons/${currentWeatherData.weather.icon}.png`}
                                                alt={currentWeatherData.weather.description}
                                                style={{ width: '4rem' }}
                                            />
                                        </Box>
                                    </Box>



                                    <Divider />
                                    <Typography sx={{ fontWeight: 'bold', mb: 2, pt: 1 }}>
                                        {currentWeatherData.weather.description}
                                    </Typography>
                                    <Divider />
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                                        <Typography>RealFeel Shade™</Typography>
                                        <Typography>{currentWeatherData.app_temp}°</Typography>
                                    </Box>
                                    <Divider />
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                                        <Typography>Wind</Typography>
                                        <Typography>{currentWeatherData.wind_cdir} {currentWeatherData.wind_spd} km/h</Typography>
                                    </Box>
                                    <Divider />
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                                        <Typography>Humidity</Typography>
                                        <Typography>{currentWeatherData.rh}%</Typography>
                                    </Box>
                                    <Divider />
                                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                                        <Typography>Cloud Cover</Typography>
                                        <Typography>{currentWeatherData.clouds}%</Typography>
                                    </Box>
                                    <Divider />
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', }}>
                                        <Typography>Air Quality</Typography>
                                        <Typography>{currentWeatherData.aqi} &nbsp;aqi</Typography>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    )
                }
            </Grid>
        </Box>
    );
};
