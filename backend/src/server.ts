import app from './app'
import mongoose from 'mongoose'
import env from './config/env'

mongoose
  .connect(env.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
  .then(async () => {
    app.listen(env.port, () => console.log(`Server is running at port ${env.port}`))
  })
