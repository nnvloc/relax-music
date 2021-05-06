import Models from '@models';
class OrderService {
  constructor() {
    this.Model = Models.Orders;
  }

  getOrders(filters = {}) {
    console.log('filters: ', filters);
    return this.Model.findAll(filters);
  }

  createOrder(params) {
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

export default new OrderService();
