const express = require('express');
const cors = require('cors');

const sequelize = require('./config/db');
const User = require('./models/users');
const mainPageRouter = require('./routes/mainpage');
const userRouter = require('./routes/user');
// const PORT = process.env.PORT;
// const PORT = process.env.PORT || 4000; // Use the provided PORT environment variable or a default value (e.g., 3000)

const port = 7000;


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

app.use(mainPageRouter)
app.use('/user', userRouter);

// async function initiate() {
//   try {
//     await sequelize.sync();
//     app.listen(PORT, () => {
//       console.log(`Server is running at ${PORT}`);
//     });
//   }
//     catch (error) {
//       console.log(error);
    
//   }
// }
// initiate();
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});



