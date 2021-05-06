import Models from '@models';
class ProductService {
  constructor() {
    this.Model = Models.Products;
  }

  getProducts(filters = {}) {
    return this.Model.findAll();
  }

  createProduct(params) {
    return this.Model.create(params);
  }

  getById(id, filters = {}) {
    const defaultFilter = {
      id,
    }

    const {where, ...rest} = filters;

    const options = {
      where: {
        ...defaultFilter,
        ...where,
      },
      ...rest
    }

    return this.Model.findOne(options)
  }
}

export default new ProductService();
