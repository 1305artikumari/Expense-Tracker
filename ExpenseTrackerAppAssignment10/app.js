const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('./config/db');
const Expenses = require('./models/expenses');
const User = require('./models/users');
const Orders = require('./models/orders');

const mainPageRouter = require('./routes/mainpage');
const userRouter = require('./routes/user');
const expenseRouter = require('./routes/expenses');
const purchaseRouter = require('./routes/purchase');
const premiumRouter = require('./routes/premium');


const PORT = 7000;


const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

User.hasMany(Expenses);
Expenses.belongsTo(User, {
  constraints: true,
  onDelete: 'CASCADE'
});

User.hasMany(Orders);
Orders.belongsTo(User, {constraints: true, onDelete: 'CASCADE'});

app.use(mainPageRouter);
app.use('/user', userRouter);
app.use('/purchase',purchaseRouter);
app.use('/expenses', expenseRouter);
// app.use('/premium',premiumRouter);

async function initiate() {
  try {
    await sequelize.sync();
    app.listen(PORT, () => {
      console.log(`Server is running at ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}
initiate();



