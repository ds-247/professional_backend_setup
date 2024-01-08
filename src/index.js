// require('dotenv').config();
import connectDB from "./db/databse.js";
import { app } from "./app.js";


connectDB()
    .then(() => {
        app.listen(process.env.PORT || 3000, () =>
          console.log(`listening on port ${process.env.PORT}`)
        );
    })
    .catch((ex) => {
        console.log("Can't Connected to the Database....", ex)
    });