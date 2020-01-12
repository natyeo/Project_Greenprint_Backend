

const app = require('./src/app');


var port = process.env.PORT

app.listen(port, () => {
  console.log(process.env.PORT)
});
