import fetch from 'node-fetch'
import { transformers } from './../helpers/openweather.js'

export const openweatherAPI = ({city, numberDay}, cb) => {
  let selection = 'forecast'
  if(numberDay !== undefined){
    if(numberDay > 5){
      return cb(400, {
        message: 'The current limit is 5 days. Please select less days'
      })
    }
    selection = 'daily'
  }

  const BASEURL = 'http://api.openweathermap.org/data/2.5/'
  const endpoints = {
    current: (city)=>`weather?q=${city}&units=imperial`,
    forecast: (city)=>`forecast?q=${city}&units=imperial`,
    daily: (city)=>`forecast?q=${city}&units=imperial` 
  }
  const key = `&APPID=${process.env.OPENWEATHER_KEY}`
  const requestURL = BASEURL + endpoints[selection](city) + key

  fetch(requestURL)
    .then( response =>
      response.json()
    )
    .then( data => {
      if(data.cod !== '200'){
        cb(data.cod, {
          message: data.message
        })
      } else {
        cb(200, {
          data: transformers[selection](data, numberDay),
          message: 'Request has been fulfilled.'
        })
      }
   
    })
}
   
  