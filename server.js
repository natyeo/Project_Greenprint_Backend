const app = require('./src/app');

app.listen(process.env.PORT || 5678, () => {
  console.log('example app listening on port 5678')
})
