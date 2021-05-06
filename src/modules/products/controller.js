import { ProductService } from '@services';

class ProductController {
  async getProducts(req, res, next) {
    const results = await ProductService.getProducts();
    res.json({
      success: true,
      results,
    });
  }

  async createProduct(req, res, next) {
    const {
      name,
      price,
    } = req.body;

    if (!name || !price) {
      throw new Error('Missing required params');
    }

    const params = {name, price};
    const createdProduct = await ProductService.createProduct(params);

    res.json({
      success: true,
      product: createdProduct,
    })
  }

  async editProduct(req, res, next) {
    const {id} = req.params;
    const {
      name,
      price,
    } = req.body;

    if (!id) {
      throw new Error('Missing required params');
    }

    const exsitedProduct = await ProductService.getById(id);
    if (!exsitedProduct) {
      throw new Error('Not found');
    }

    exsitedProduct.name = name;
    exsitedProduct.price = price;
    await exsitedProduct.save();

    res.json({
      success: true,
      product: exsitedProduct
    })
  }

  async removeProduct(req, res, next) {
    const {id} = req.params;

    if (!id) {
      throw new Error('Missing required params');
    }

    const exsitedProduct = await ProductService.getById(id);
    if (!exsitedProduct) {
      throw new Error('Not found');
    }

    exsitedProduct.isRemoved = true;
    await exsitedProduct.save();

    res.json({
      success: true,
    })
  }
}

export default new ProductController();
