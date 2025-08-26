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

describe('delete', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })
    it('error', async () => {
        (mockCategoryModel.findCategoryById as jest.Mock).mockResolvedValue(null)
        const categoryDeleted = categoryService.delete(1, 1)
        await expect(categoryDeleted).rejects.toThrow('Category not found')
        await expect(categoryDeleted).rejects.toBeInstanceOf(CustomError)
    })
    it('return category deleted', async () => {
        const mockCategoryDeleted = {id: 1, name: 'category1', budget:4000};
        (mockCategoryModel.findCategoryById as jest.Mock).mockResolvedValue(mockCategoryDeleted);
        (mockCategoryModel.delete as jest.Mock).mockResolvedValue(mockCategoryDeleted)
        const categoryDeleted = await categoryService.delete(1,1)
        expect(categoryDeleted).toEqual(mockCategoryDeleted)
    })
})

describe('update', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })
    it('error when category don\'t exist', async () => {
        const mockCategoryUpdated = {name: 'a', budget: 3000};
        (mockCategoryModel.findCategoryById as jest.Mock).mockResolvedValue(null);
        const categoryUpdated = categoryService.update(1, 1, mockCategoryUpdated);
        await expect(categoryUpdated).rejects.toThrow('Category not found')
        await expect(categoryUpdated).rejects.toBeInstanceOf(CustomError)
    })
    it('updateCategoryData withouyt user_id', async () => {
        const mockCategoryUpdated = {id: 1, name: 'a', budget: 3000, user_id: 1};
        const mockCategory = {id: 1, name: 'b', buidget: 2000, user_id: 1};
        (mockCategoryModel.findCategoryById as jest.Mock).mockResolvedValue(mockCategory);
        (mockCategoryModel.update as jest.Mock).mockResolvedValue(mockCategoryUpdated);

        const categoryUpdated = await categoryService.update(1, 1, mockCategoryUpdated);
        expect(categoryUpdated).toEqual({
            id: 1,
            name: 'a',
            budget:3000
        })
    })
})