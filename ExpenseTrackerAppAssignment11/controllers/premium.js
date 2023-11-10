const fs = require('fs').promises;
const path = require('path');
const User = require('../models/users');

exports.getLeaderboardExpenses = async (request, response, next) => {
  try {
    const leaderboard = await User.findAll({
      attributes: ['id', 'name', 'totalExpenses'],
      order: [['totalExpenses', 'DESC']],
      limit: 15
    });
    return response.status(200).json(leaderboard);
  } catch (error) {
    console.error(error);
    return response.status(401).json({ message: 'Unauthorized - please relogin' });
  }
};

exports.getDownloadURL = async (request, response, next) => {
  try {
    const user = request.user;
    const expenses = await user.getExpenses({
      attributes: ["category", "pmethod", "amount", "date"],
    });
    const formattedExpenses = expenses.map(expense => {
      return `Category: ${expense.category}
Payment Method: ${expense.pmethod}
Amount: ${expense.amount}
Date: ${expense.date}
`;
    });
    const textData = formattedExpenses.join("\n");
    
    // Save the text data to a local file
    const filename = path.join(__dirname, `../expense-data/user${user.id}/${user.name}${new Date()}.txt`);
    await fs.writeFile(filename, textData);

    // You can store the local file path in the database instead of a URL
    await user.createDownload({
      downloadPath: filename
    });

    response.status(200).json({ success: true });
  } catch (error) {
    console.log("Error while creating download link: " + error);
    response.status(500).json({ message: "Unable to generate URL" });
  }
};

exports.getDownloadhistory = async(request, response, next) => {
  try {
    const user = request.user;
    const history = await user.getDownloads();
    response.status(200).json(history);
  } catch (error) {
    console.log(error);
    return response.status(401).json({ message: 'Unable to fetch history' });
  }
};
