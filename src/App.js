
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { CurrentWeather } from './component/currentWeather/CurrentWeather';
import { WeatherForcaste } from './component/Forecaste/ForeCaste';
import { SearchBar } from './component/search/SearchBar';
import NotFound from './component/NotFound'
import { useState } from 'react';





function App() {
  const [city, setCity] = useState("Hyderabad");
  return (

    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<SearchBar city={city} setCity={setCity} />}>
            <Route path="/" element={<CurrentWeather city={city} />} />
            <Route path="forecaste/:city" element={<WeatherForcaste city={city} />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>

  );
}

export default App;
