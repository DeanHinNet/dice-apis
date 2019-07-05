import moment from 'moment'

export const closestForecast = (data)=>{
  const today = new Date()
  let currentClosest = moment(data.list[0].dt_txt).format('YYYY-MM-DD HH:mm:ss')
  let interval = Math.abs(moment(currentClosest).diff(today))
  let closestData = data.list[0]

  for(let i=1; i<data.list.length-1; i++){
    if(Math.abs(moment(data.list[i].dt_txt).diff(today)) < interval){
      interval = Math.abs(moment(data.list[i].dt_txt).diff(today))
      currentClosest = data.list[i].dt_txt
      closestData = data.list[i]
    }
  }
  return closestData
}

export const transformers = {
  daily: (data, numberDay) => {
    let currentDay = moment(data.list[0].dt_txt).format('YYYY-MM-DD')
    let forecasts = [{
      forecast_time: data.list[0].dt_txt,
      high: data.list[0].main.temp_max,
      low: data.list[0].main.temp_min,
      description: data.list[0].weather[0].description
    }]

    for(let i=1; i<data.list.length; i++){
      if(forecasts.length + 1 > numberDay){
        return forecasts
      }

      if(moment(currentDay).diff(moment(data.list[i].dt_txt).format('YYYY-MM-DD')) !== 0){
        forecasts.push({
          forecast_time: data.list[i].dt_txt,
          high: data.list[i].main.temp_max,
          low: data.list[i].main.temp_min,
          description: data.list[i].weather[0].description
        })
        currentDay = moment(data.list[i].dt_txt).format('YYYY-MM-DD')
      }
    }
    return forecasts
  },
  forecast: data =>{
    const forecast = closestForecast(data)
    return {
      forecast_time: forecast.dt_txt,
      high: forecast.main.temp_max,
      low: forecast.main.temp_min,
      description: forecast.weather[0].description
    }
  }
}
