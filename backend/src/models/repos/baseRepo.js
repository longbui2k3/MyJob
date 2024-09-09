const { PAGE, LIMIT } = require("../../helpers/constants");
const { changePopulateStringToObject } = require("../../utils");

class BaseRepo {
  constructor(model) {
    this.model = model;
  }

  async findById(
    id = "",
    { addedFields = [], select = [], unselect = [], populates = [] } = {
      addedFields: [],
      select: [],
      unselect: [],
      populates: [],
    }
  ) {
    let result = this.model.findById(id);
    result = this.#chaining(result, {
      addedFields,
      select,
      unselect,
      populates,
    });

    return await result;
  }

  async findOne(
    obj = {},
    { addedFields = [], select = [], unselect = [], populates = [] } = {
      addedFields: [],
      select: [],
      unselect: [],
      populates: [],
    }
  ) {
    let result = this.model.findOne(obj);
    result = this.#chaining(result, {
      addedFields,
      select,
      unselect,
      populates,
    });
    //
    return await result;
  }

  async find(
    obj = {},
    {
      addedFields = [],
      select = [],
      unselect = [],
      populates = [],
      sort = [],
      page = PAGE,
      limit = LIMIT,
    } = {
      addedFields: [],
      select: [],
      unselect: [],
      populates: [],
      sort: [],
      page: PAGE,
      limit: LIMIT,
    }
  ) {
    let result = this.model.find(obj);
    result = this.#chaining(result, {
      addedFields,
      select,
      unselect,
      populates,
    });
    result = this.#chainingForList(result, { sort, page, limit });

    return await result;
  }

  async create(obj) {
    let result = this.model.create(obj);
    return await result;
  }

  async findByIdAndUpdate(
    id = "",
    updatedData = {},
    { addedFields = [], select = [], unselect = [], populates = [] } = {
      addedFields: [],
      select: [],
      unselect: [],
      populates: [],
    },
    upsert = false
  ) {
    let result = this.model.findByIdAndUpdate(id, updatedData, {
      new: true,
      upsert,
    });
    result = this.#chaining(result, {
      addedFields,
      select,
      unselect,
      populates,
    });

    return await result;
  }

  async findOneAndUpdate(
    obj = {},
    updatedData = {},
    { addedFields = [], select = [], unselect = [], populates = [] } = {
      addedFields: [],
      select: [],
      unselect: [],
      populates: [],
    },
    upsert = false
  ) {
    let result = this.model.findOneAndUpdate(obj, updatedData, {
      new: true,
      upsert,
    });
    result = this.#chaining(result, {
      addedFields,
      select,
      unselect,
      populates,
    });

    return await result;
  }

  async updateMany(obj = {}, updatedData = {}, upsert = false) {
    let result = this.model.updateMany(obj, updatedData, {
      //   new: true,
      upsert,
    });
    return await result;
  }

  async deleteOne(obj = {}) {
    let result = this.model.deleteOne(obj);
    return await result;
  }

  async deleteMany(obj = {}) {
    let result = this.model.deleteMany(obj);
    return await result;
  }

  #chaining(
    result,
    { addedFields = [], select = [], unselect = [], populates = [] } = {
      select: [],
      unselect: [],
      populates: [],
    }
  ) {
    let selectStr = "";
    if (unselect.length !== 0) {
      selectStr = selectStr + unselect.map((field) => "-" + field).join(" ");
    }
    if (select.length !== 0) {
      selectStr = selectStr + " " + select.map((field) => "" + field).join(" ");
    }
    if (addedFields.length !== 0) {
      selectStr =
        selectStr + " " + addedFields.map((field) => "+" + field).join(" ");
    }
    if (
      select.length !== 0 ||
      unselect.length !== 0 ||
      addedFields.length !== 0
    ) {
      result = result.select(selectStr);
    }
    populates.forEach((populate) => {
      result = result.populate(changePopulateStringToObject(populate));
    });
    return result;
  }

  #chainingForList(result, { sort = [], page = PAGE, limit = LIMIT }) {
    if (sort.length !== 0) {
      result = result.sort(sort.join(" "));
    } else {
      result = result.sort("-createdAt");
    }

    page = page * 1;
    limit = limit * 1;
    const skip = (page - 1) * limit;
    result = result.skip(skip).limit(limit);

    return result;
  }
}

module.exports = BaseRepo;
