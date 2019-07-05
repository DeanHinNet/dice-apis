import fetch from 'node-fetch'

export const weatherbitAPI = (selection, city, state, cb)=>{

    // high, low, and weather description
    const BASEURL = 'http://api.weatherbit.io/v2.0/'
    const endpoints = {
      zip: (zip)=>`current?postal_code=${zip}`,
      current: (city, state)=>`current?city=${city},${state}`,
      forecast: (city, state)=>`/forecast/daily?city=${city},${state}`
    }
    const key = `&key=${process.env.WEATHERBIT_KEY}`

    const transformers = {
      current: (data)=>({
        observed_time: data.ob_time,
        description: data.weather.description,
      })
    }
    
    const requestURL = BASEURL + endpoints[selection](city, state) + key

    fetch(requestURL)
    .then((response)=>
      response.json()
    )
    .then(data =>{
      console.log('data:', data)
     //console.log('transformers:', tranformers[selection](data.data[0]))
      cb({
        data: data,
        message:'Here it is'
      })
    })
}