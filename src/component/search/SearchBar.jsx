import React, { useState } from "react";
import './search.css';
import axios from "axios";

import { Box, Typography } from "@mui/material";
import { Link, Outlet } from "react-router-dom";

export const SearchBar = ({ city, setCity }) => {
    const [selectedCity, setSelectedCity] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [divider, setDivider] = useState(true);

    const FetchSuggestionCity = async (query) => {
        if (query.length < 3) {
            setSelectedCity([]);
            return;
        }
        try {
            const response = await axios.get(
                `https://us1.locationiq.com/v1/autocomplete.php`,
                {
                    params: {
                        key: 'pk.89768f4713ce4d1b837d122a75892eb1',
                        q: query,
                        format: 'json',
                        addressdetails: 1,
                        limit: 10,
                    }
                }
            );

            const result = response.data.filter(place => place.type === 'city');
            setSelectedCity(result);
        } catch (error) {
            setSelectedCity([]);
        }
    };

    const HandleInputChange = (e) => {
        const value = e.target.value;
        setInputValue(value);
        FetchSuggestionCity(value);
    };

    const handleCitySelect = (city) => {
        const cityName = city.display_name.split(',')[0];
        setInputValue(cityName);
        setCity(cityName)
        setSelectedCity([]);
    };

    const handleCurrentWeatherdivider = () => {
        setDivider(true);
    };

    const handleForecsteDivider = () => {
        setDivider(false);
    };

    const handleSearch = (e) => {
        if (e.key === 'Enter') {
            setCity(inputValue);
            setSelectedCity([])
        }
    };

    return (
        <>
            <Box sx={{ height: '15vh', width: '100%', bgcolor: '#2b2b2b', display: 'flex', alignItems: "center", flexDirection: 'column' }}>
                <Box sx={{ width: "100%", textAlign: "center", pt: 2 }} >
                    <Box
                        component="input"
                        type="text"
                        id="cityInput"
                        name="city"
                        value={inputValue}
                        onChange={HandleInputChange}
                        onKeyDown={handleSearch}
                        placeholder="Enter at least 3 characters of city"
                        sx={{
                            height: "5vh",
                            borderRadius: "10px",
                            textAlign: "center",
                            fontSize: 'Medium',
                            outline: 'none',
                            border: "1px solid gray",
                            width: {
                                xs: "75%",
                                sm: "75%",
                                md: "25%",
                            }
                        }}
                    />
                </Box>
                <Box sx={{ display: "flex", gap: "0.4rem" }}>
                    {selectedCity.length > 0 && (
                        selectedCity.map((c, index) => (
                            <Box
                                key={index}
                                onClick={() => handleCitySelect(c)}
                                sx={{
                                    color: 'rgb(217, 216, 216)',
                                    border: ' 2px solid rgb(193, 190, 190)',
                                    fontSize: { xs: 'small', sm: 'small', md: 'medium' },
                                    padding: ' 0.4rem 0.6rem',
                                    borderRadius: "20px",
                                    mt: 1
                                }}
                            >
                                {c.display_name.split(',')[0]}
                            </Box>
                        ))
                    )}
                </Box>
            </Box>

            <Box sx={{ height: '6vh', display: 'flex', alignItems: "center", justifyContent: 'space-evenly', bgcolor: "rgb(50, 50, 50) ", color: 'rgb(217, 216, 216)' }} >
                <Link to="/" style={{ textDecoration: "none", color: "inherit" }} onClick={handleCurrentWeatherdivider}>
                    <Box >
                        <Typography >Current Weather</Typography>
                        {divider && <hr style={{ color: "rgb(193, 190, 190)" }} />}
                    </Box>
                </Link>
                <Link to={`/forecaste/${city}`} style={{ textDecoration: "none", color: "inherit" }} onClick={handleForecsteDivider}>
                    <Box>
                        <Typography >7-day weather forecaste</Typography>
                        {!divider && <hr style={{ color: "rgb(193, 190, 190)" }} />}
                    </Box>
                </Link>
            </Box>
            <Outlet />
        </>
    );
};

