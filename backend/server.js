const dotenv = require("dotenv");
const mongoose = require("mongoose");
const app = require("./src/app");
const PORT = process.env.PORT || 8080;

dotenv.config();

mongoose.connect(process.env.MONGO_URI).then(() => {
  
  app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
}).catch((err) => {
  console.error("Error connecting to MongoDB:", err);
}); 
