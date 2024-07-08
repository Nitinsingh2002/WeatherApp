import React from 'react';
import {  Typography, Box } from '@mui/material';
import { Line } from 'react-chartjs-2';

const WeatherGraph = ({ forecastData }) => {
    const getChartData = () => {
        if (!forecastData.length) {
            return {
                labels: [],
                datasets: []
            };
        }

        const labels = forecastData.map(day => new Date(day.valid_date).toLocaleDateString());
        const temperatures = forecastData.map(day => day.temp);

        return {
            labels,
            datasets: [
                {
                    label: 'Temperature (°C)',
                    data: temperatures,
                    borderColor: 'rgba(75,192,192,1)',
                    backgroundColor: 'rgba(75,192,192,0.2)',
                    fill: true,
                }
            ]
        };
    };

    const chartData = getChartData();

    return (
        <Box sx={{ minHeight: '50vh', p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center',mt:2 ,pb:2 }}>
            <Typography variant="h5" gutterBottom sx={{ width: { xs: "98%", sm: "98%", md: "80%" }, textAlign: 'start' }} color="textSecondary">
                Temperature Trends for Next Seven Days
            </Typography>
            {chartData.labels.length > 0 ? (
                <Box
                    sx={{
                        height: '50vh',
                        width: {
                            xs: '98%',
                            sm: '98%',
                            md: '80%',
                        },
                    }}
                >

                    <Line data={chartData} options={{ maintainAspectRatio: false }} />
                </Box>
            ) : (
                <Typography variant="body2" color="textSecondary" sx={{ textAlign: 'center' }}>
                    No data available
                </Typography>
            )}
        </Box>


    );
};

export default WeatherGraph;
