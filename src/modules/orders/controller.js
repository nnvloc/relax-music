import { OrderService, OrderDetailService } from '@services';
import {getTotalAmountFromItems} from './helpers';
import Models from '@models';

class OrderController {
  async createOrder(req, res, next) {
    const user = req.user;
    const {items} = req.body;
    if (!items || !items.length) {
      throw new Error('Missing required params');
    }
    const totalAmount = getTotalAmountFromItems(items);
    const params = {
      owner: user.id,
      amount: totalAmount,
    }

    const createdOrder = await OrderService.createOrder(params);
    const {id} = createdOrder;
    if (!createdOrder) {
      return;
    }

    const parsedOrderDetail = items.map(data => {
      const {quantity = 1, price} = data;
      const amount = price * quantity;
      return {
        order: id,
        product: data.id,
        quantity,
        price,
        amount,
      }
    });

    await OrderDetailService.createBulk(parsedOrderDetail);

    res.json({
      success: true,
      orderId: createdOrder.id,
    })
  }

  async getMyOrders(req, res, next) {
    const {user} = req;
    const filters = {
      where: {
        owner: user.id,
      },
      include: [{
        model: Models.OrderDetails,
        as: 'items',
      }]
    }
    const results = await OrderService.getOrders(filters);

    res.json({
      success: true,
      results,
    });
  }

  async getOrderById(req, res, next) {
    const {user} = req;
    const {id} = req.params;
    if (!id) {
      throw new Error('Missing required params');
    }

    const filters = {
      where: {
        owner: user.id,
      },
      include: [{
        model: Models.OrderDetails,
        as: 'items',
        include: [{
          model: Models.Products,
          as: 'productItem'
        }]
      }],
    };

    const results = await OrderService.getById(+id, filters);

    res.json({
      success: true,
      results,
    });
  }
}

export default new OrderController();
