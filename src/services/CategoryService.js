import Models from '@models';
class CategoryService {
  constructor() {
    this.Model = Models.ref('Categories');
  }

  async getCategories(filters = {}) {
    return new Promise((resolve, reject) => {
      return this.Model.once("value", function(snapshot) {
        return resolve(snapshot.val());
      }, function (errorObject) {
        return reject(new Error("The read failed: " + errorObject.code));
      });
    });
  }

  async createCategory(params) {
    return this.Model.push(params);
  }
}

export default new CategoryService();
