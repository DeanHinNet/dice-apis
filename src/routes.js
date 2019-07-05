import { openweatherAPI } from './apis/openweather'

export default app => {
  app.get('/:city', (req, res)=>{
    openweatherAPI({city: req.params.city}, (status, result)=>{
      res.status(status).send(result)
    })    
  })
  app.get('/:city/:numberDay', (req, res)=>{
    openweatherAPI({city: req.params.city, numberDay: req.params.numberDay}, (status, result)=>{
      res.status(status).send(result)
    })    
  })  
}