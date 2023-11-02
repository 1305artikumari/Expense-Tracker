const Userservices = require('../services/userservices');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY;
exports.usergethomePage = (request, response, next) => {
  response.sendFile('main.html', { root: 'views' });
}
exports.signupAuthentication = async (request, response, next) => {
  const { Name, userName, password } = request.body;
  try {
      const user = await Userservices.getUserbyemail(userName);
      if (!user) {
          const hashedPassword = await bcrypt.hash(password, 10);
          const user = await Userservices.createUser(Name,userName,hashedPassword);
          const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn: '1h' });
          response.status(200).send({ token: token, user: user });
      } else {
          response.status(401).send(user);
      }

  } catch (error) {
      console.log(error);
  }
}
exports.getcurrentuser = async (request, response, next) => {
  const user = request.user;
  response.json({user});
}
