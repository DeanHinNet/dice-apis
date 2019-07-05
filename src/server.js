import express from 'express'
import routes from './routes'

const app = express()
routes(app)

app.listen(process.env.PORT, () =>
  console.log(`Server running on http://localhost:${process.env.PORT}`)
)

export default app //for testing