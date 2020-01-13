const app = require('./src/app');
const db = process.env.MONGO_ATLAS_KEY;

var port = process.env.PORT

app.listen(port, () => {
  console.log(process.env.PORT)


  const connectDB = async () => {
    try {
      await mongoose.connect(db, {
        useUnifiedTopology: true,
        useNewUrlParser: true
      });
      console.log("MongoDB is Connected...");
    } catch (err) {
      console.error(err.message);
      process.exit(1);
    }
  };





});
