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

describe('create', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })
    it('It should throw an error when the user tries to create a category that already exists', async () => {
        const mockCreateCategoryPayload = {name: 'casa', budget: 1200};
        (mockCategoryModel.findCategory as jest.Mock).mockResolvedValue(mockCreateCategoryPayload);
        const createCategory = categoryService.create(mockCreateCategoryPayload, 1)
        await expect(createCategory).rejects.toThrow('Category already exist')
        await expect(createCategory).rejects.toBeInstanceOf(CustomError)
    })
    it('Should return a new category without userId field', async () => {
        const mockCreateCategoryPayload = {id: 1, name: 'casa', budget: 1200, user_id: 1};
        const categoryWithoutUserId = {id: 1, name: 'casa', budget: 1200};
        (mockCategoryModel.findCategory as jest.Mock).mockResolvedValue(false);
        (mockCategoryModel.create as jest.Mock).mockResolvedValue(mockCreateCategoryPayload);
        const categoryCreated = await categoryService.create(mockCreateCategoryPayload, 1);
        expect(categoryCreated).toEqual(categoryWithoutUserId);
    })
})

describe('get', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })
    it('it should be return an empty array', async () => {
        (mockCategoryModel.getAll as jest.Mock).mockResolvedValue([]);
        const categories = await categoryService.get(1);
        expect(categories).toEqual([]);
    })
})