"use strict";
const mongoose = require("mongoose");
const uri = process.env.MONGODB_URI;

class Database {
  constructor() {
    this.connect();
  }

  async connect() {
    const connection = await mongoose
      .connect(uri, {
        maxPoolSize: 50,
      })
      .then((res) => {
        console.log("Connect database successfully!");
      })
      .catch((err) => {
        console.log("Error Connect!");
      });
    // if (connection) {
    //   connection.model(userModel);
    //   connection.model(keytokenModel);
    //   connection.model(applicationModel);
    //   connection.model(companyModel);
    //   connection.model(favoritejobModel);
    //   connection.model("Job", jobSchema);
    //   connection.model(profileModel);
    //   connection.model(resumeModel);
    //   connection.model(savedcandidateModel);
    // }
  }
  static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }
}

const DBInstance = Database.getInstance();
module.exports = DBInstance;
