import React, { useState, useEffect } from 'react';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

//header component
function Header() {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [clockTime, setClockTime] = useState(new Date());
  const [isClockPaused, setIsClockPaused] = useState(false);
  const [pausedTime, setPausedTime] = useState(null);

  // Fetching the list of countries on component mount
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch('http://worldtimeapi.org/api/timezone');
        const data = await response.json();
      
        setCountries(data);
        // Seting the default selected country (Asia/Kolkata)
        setSelectedCountry(data[182] || '');
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };

    fetchCountries();
  }, []);

  // Fetching and update the clock time based on the selected country
  useEffect(() => {
    const fetchClockTime = async () => {
      try {
        if (selectedCountry) {
          const response = await fetch(`http://worldtimeapi.org/api/timezone/${selectedCountry}`);
          const data = await response.json();
          
          const { raw_offset, dst_offset } = data;
          const offsetMilliseconds = (raw_offset + dst_offset) * 1000;
          const utcDateTime = new Date(data.utc_datetime);
          const localDateTime = new Date(utcDateTime.getTime() + offsetMilliseconds);
  
          if (!isClockPaused) {
            setClockTime(localDateTime);
          }
        }
      } catch (error) {
        console.error('Error fetching clock time:', error);
      }
    };

    // Updating clock time every second if it is not paused
    const intervalId = setInterval(() => {
      if (!isClockPaused) {
        fetchClockTime();
      }
    }, 1000);

    // Clearing the interval when the component unmounts
    return () => clearInterval(intervalId);

  }, [selectedCountry, isClockPaused]);

  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
  };

  const handlePauseStartClick = () => {
    if (isClockPaused) {
        setPausedTime(new Date());
      } else {
        if (pausedTime) {
          setIsClockPaused(true);
          const elapsedTime = new Date() - pausedTime;
          setClockTime((prevTime) => new Date(prevTime.getTime() + elapsedTime));
        }
      }
    setIsClockPaused(!isClockPaused);
  };
  

  return (
    <Container>
      <Toolbar>
      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Button style={{ backgroundColor: "#ccebe2", color: 'black' }} href='/'>
            Back
          </Button>
        </Typography>
        <Select
          value={selectedCountry}
          onChange={handleCountryChange}
          label="Select Country"
          style={{
            borderRadius: '0px',
            border: 'none',
            backgroundColor: 'transparent',
          }}
        >
          {countries.map((country) => (
            <MenuItem key={country} value={country}>
              {country}
            </MenuItem>
          ))}
        </Select>
        <Typography variant="h6" component="div" sx={{ marginLeft: 2, border: '1px solid #ccc', padding: '10px', borderRadius: '0px',backgroundColor:'#464648',color:'#ddd5e5',lineHeight:1 }}>
  {clockTime.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })}
</Typography>
        <Button onClick={handlePauseStartClick} style={{backgroundColor:'green',color:'black',padding:5,marginLeft:10}}>
          {isClockPaused ? 'Start' : 'Pause'}
        </Button>
      </Toolbar>
    </Container>
  );
}

export default Header;
