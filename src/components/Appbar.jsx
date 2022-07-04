import React, { useEffect, useState } from 'react'
import './css/style.css'
import Wave from 'react-wavify';
function Appbar() {

  const [city, setcity] = useState(null);
  const [search, setSearch] = useState('');


  useEffect(() => {
    async function fetchData() {
      const url = `https://api.weatherapi.com/v1/current.json?key=${process.env.REACT_APP_API_KEY}&q=${search}&aqi=no`

      const response = await fetch(url);

      const data = await response.json();
      console.log(data);
      setcity(data);
    }
    fetchData();

  }, [search]);


  return (
    <>
      <div className='box'>
        <div className='inputData'>
          <input
            type="search"
            className="input=field"
            placeholder="Search"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        {city ? search === '' ? <div className='suggestion'>
          <p>🔎 Search by city name</p>
        </div> : city.error
          ? (
            <div className='error'>
              <p>No data Found.</p>
            </div>
          )
          : (

            <div className='info'>
              <div className='main'>
                <div className="image"> <img src={city.current.condition.icon} alt="" /></div>
                <div className='text'> <h1 className='location'> <span>{search}</span></h1></div>
              </div>

              <h2 className='temp'>
                {city.current.temp_c}°C

              </h2>
              <h3 className='mini' >
                condition : {city.current.condition.text}
              </h3>
            </div>
          ) : (<>loading...</>)
        }
        <div className='wave'>
          <Wave fill='#00BFFF '
            paused={false}
            options={{

              amplitude: 40,
              speed: 0.3,
              points: 2,

            }}
          />
        </div>

      </div>
    </>
  )
}

export default Appbar