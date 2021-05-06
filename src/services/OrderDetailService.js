import Models from '@models';
class OrderDetailService {
  constructor() {
    this.Model = Models.OrderDetails;
  }

  getOrderDetails(filters = {}) {
    return this.Model.findAll(filters);
  }

  createOrderDetail(params) {
    return this.Model.create(params);
  }

  createBulk(params) {
    return this.Model.bulkCreate(params);
  }
}

export default new OrderDetailService();
