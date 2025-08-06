import { CustomError } from '../../../src/errors/CustomError';
import { CategoryService } from '../../../src/modules/category/category.service'

const mockCategoryModel = {
    findCategory: jest.fn(),
    findCategoryById: jest.fn(),
    create: jest.fn(),
    getAll: jest.fn(),
    delete: jest.fn(),
    update: jest.fn()
}

const categoryService = new CategoryService(mockCategoryModel);

describe('', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })
    it('', async () => {
        const mockCreateCategoryPayload = {name: 'casa', budget: 1200};
        (mockCategoryModel.findCategory as jest.Mock).mockResolvedValue(mockCreateCategoryPayload);
        const createCategory = categoryService.create(mockCreateCategoryPayload, 1)
        await expect(createCategory).rejects.toThrow('Category already exist')
        await expect(createCategory).rejects.toBeInstanceOf(CustomError)
    })
})