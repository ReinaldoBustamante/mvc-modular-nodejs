import { prisma } from '../../../src/config/db'
import { CustomError } from '../../../src/errors/CustomError'
import { CategoryModel } from '../../../src/modules/category/category.model'

jest.mock('../../../src/config/db', () => ({
    prisma: {
        categories: {
            findUnique: jest.fn(),
            findMany: jest.fn(),
            create: jest.fn(),
            delete: jest.fn(),
            update: jest.fn()
        }
    }
}))

let categoryModel: CategoryModel

describe('categoryModule - model', () => {
    describe('categoryModel - findCategory', () => {
        beforeEach(() => {
            categoryModel = new CategoryModel()
            jest.clearAllMocks();
        })
        it('should return the category found by name and user_id', async () => {
            const mockCategory = {id: 1, name: 'ahorro', budget: 2400, user_id: 1};
            (prisma.categories.findUnique as jest.Mock).mockResolvedValue(mockCategory)
            const category = await categoryModel.findCategory(mockCategory.name, mockCategory.user_id)
            expect(category).toEqual(mockCategory);
        })
        it('', async () => {
            (prisma.categories.findUnique as jest.Mock).mockRejectedValue( new Error(''))
            const category = categoryModel.findCategory('name', 1);
            await expect(category).rejects.toThrow('Error buscando categoria')
        })
    })
    describe('categoryModel - findCategoryById', () => {
        beforeEach(() => {
            categoryModel = new CategoryModel()
            jest.clearAllMocks();
        })
        it('', () => {
            expect(true).toBe(true);
        })
    })
})