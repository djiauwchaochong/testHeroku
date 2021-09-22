'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Reports extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }

    get indonesianTime(){
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };    
      return this.dateOfEvent.toLocaleDateString('ID', options);
    }

    get editDate(){
      return this.dateOfEvent.toISOString().slice(0, 10)
    }

    static minAge(){
      return Reports.min('age')
    }

    static maxAge(){
      return Reports.max('age')
    }

    static avgAge(){
      return new Promise((resolve, reject) => {
        Reports.findAll({ attributes: [[sequelize.fn('AVG', sequelize.col('age')), 'avg']], raw: true
        })
        .then(data => {
          resolve((+data[0].avg).toFixed(2))
        })
        .catch(error => {
          reject(error)
        })
      }) 
    }
    
  };
  Reports.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    age: DataTypes.NUMBER,
    email: DataTypes.STRING,
    nik: DataTypes.STRING,
    event: DataTypes.STRING,
    description: DataTypes.TEXT,
    photo: DataTypes.STRING,
    dateOfEvent: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Reports',
  });
  return Reports;
};