import { CategoryService } from '@services';

class ProductController {
  async getCategories(req, res, next) {
    const results = await CategoryService.getCategories();
    res.json({
      success: true,
      results,
    });
  }

  async createCategory(req, res, next) {
    const {
      name,
    } = req.body;

    if (!name) {
      throw new Error('Missing required params');
    }

    // const params = {name};
    const createdCategory = await CategoryService.createCategory(name);

    res.json({
      success: true,
      category: createdCategory,
    })
  }
}

export default new ProductController();
