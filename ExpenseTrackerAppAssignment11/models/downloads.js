const Sequelize = require('sequelize');
const sequelize = require('../config/db');
const Downloads = sequelize.define('Downloads',{
    id: {
        type :Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull:false
    },
    downloadUrl:{
        type: Sequelize.STRING(),
        unique:true,
        validate:{isUrl:true},
        notEmpty:true,
        allowNull: false,
    }
})
module.exports=Downloads;