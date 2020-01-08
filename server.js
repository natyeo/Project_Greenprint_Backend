const app = require('./src/app');
const { port } = require('./config')

app.listen(process.env.PORT, () => {
  console.log('example app listening on port 5678');
})
