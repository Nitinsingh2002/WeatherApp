import React, { useState } from "react";
import './search.css';
import axios from "axios";
import SearchIcon from '@mui/icons-material/Search';
import { Box, Typography } from "@mui/material";

export const SearchBar = () => {
    const [city, setCity] = useState("");
    const [selectedCity, setSelectedCity] = useState([]);

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
        setCity(value);
        FetchSuggestionCity(value);
    };

    const handleCitySelect = (city) => {
        const cityName = city.display_place || city.display_name.split(',')[0];
        setCity(cityName);
        setSelectedCity([]);
    };


    return (
        <>
            <div className="search-container">
                <div className="searchBar-container">
                    <input
                        type="text"
                        id="cityInput"
                        name="city"
                        value={city}
                        onChange={HandleInputChange}
                        placeholder="Enter at least 3 characters of city"
                    />
                    <button><SearchIcon /></button>
                </div>

                <div>
                    {
                        selectedCity.length > 0 && (
                            <div className="search-suggestion-div">
                                {
                                    selectedCity.map((c, index) => (
                                        <div
                                            onClick={() => handleCitySelect(c)}
                                            key={index}
                                            className="search-suggestion"
                                        >
                                            {c.display_name.split(',')[0]}
                                        </div>
                                    ))
                                }
                            </div>

                        )
                    }
                </div>
            </div>


            <Box sx={{ height: '6vh', display: 'flex', alignItems: "center", justifyContent: 'space-evenly', bgcolor: "rgb(50, 50, 50) ", color: 'rgb(217, 216, 216)' }}>
                <Typography>Current Weather</Typography>
                <Typography>7-day weather forecaste</Typography>
            </Box>

        </>
    );
};
