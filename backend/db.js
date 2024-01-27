const mongoose = require("mongoose");

const MongoURI =
  "mongodb+srv://tif:tif123456@cluster0.r1pfpq2.mongodb.net/tif?retryWrites=true&w=majority";

const mongoDB = () => {
 try{ mongoose
    .connect(MongoURI)
    .then(() => {
      console.log("Connected to MongoDB");
      // const fetched_data = mongoose.connection.db.collection("community");

      // fetched_data.find({}).toArray(function (err, data) {
      //   if (!err) {
      //     console.log('Data received from the database:\n');
      //     // Now you can use the 'data' variable or pass it to another function
      //     processData(data);
      //   } else {
      //     console.error(err);
      //   }
      // });
      
    })}
    catch(err){
      console.error(err);
    };
};
module.exports = mongoDB;
