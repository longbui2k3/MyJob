const { OK } = require("../core/success.response");
const FavoriteJobService = require("../services/favoriteJob.service");

class FavoriteJobController {
  constructor() {}

  findFavoriteJob = async (req, res, next) => {
    const result = await FavoriteJobService.findFavoriteJob(
      req.user.userId,
      req.params.jobId
    );

    return new OK({
      message: "Find favorite job successfully",
      metadata: {
        favoriteJob: result,
      },
    }).send(res);
  };

  favoriteJob = async (req, res, next) => {
    const result = await FavoriteJobService.favoriteJob(
      req.user.userId,
      req.params.jobId
    );

    return new OK({
      message: "Favorite job successfully",
      metadata: {
        favoriteJob: result,
      },
    }).send(res);
  };

  unfavoriteJob = async (req, res, next) => {
    const result = await FavoriteJobService.unfavoriteJob(
      req.user.userId,
      req.params.jobId
    );

    return new OK({
      message: "Unfavorite job successfully",
      metadata: {},
    }).send(res);
  };
}
module.exports = new FavoriteJobController();
