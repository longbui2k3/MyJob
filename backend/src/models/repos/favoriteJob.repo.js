const favoriteJobModel = require("../favoriteJob.model");

const BaseRepo = require("./base.repo");

class FavoriteJobRepo extends BaseRepo {
  constructor() {
    super(favoriteJobModel);
  }
}

module.exports = new FavoriteJobRepo();
