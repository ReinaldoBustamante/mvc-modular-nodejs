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
        it('', async () => {
            const mockCategory = {id: 1, name: 'ahorro', budget: 2400, user_id: 1};
            (prisma.categories.findUnique as jest.Mock).mockResolvedValue(mockCategory);
            const categoryFound = await categoryModel.findCategoryById(1, 1);
            expect(categoryFound).toEqual(mockCategory);
        })
    })

    describe('categoryModel - create', () => {
        beforeEach(() => {
            categoryModel = new CategoryModel()
            jest.clearAllMocks();
        })
        it('', async () => {
            const mockPayload = {name: 'casa', budget: 400000};
            (prisma.categories.create as jest.Mock).mockResolvedValue({id: 1, ...mockPayload})
            const category = await categoryModel.create(mockPayload, 1)
            expect(category).toEqual({id: 1, ...mockPayload})
        })
        it('', async () => {
            const mockPayload = {name: '', budget: 0};
            (prisma.categories.create as jest.Mock).mockRejectedValue(new Error(''))
            const category = categoryModel.create(mockPayload, 1)
            await expect(category).rejects.toThrow('Error creando categoria')
        })
    })

    describe('categoryModel - getAll', () => {

    })

    describe('categoryModel - delete', () => {

    })

    describe('categoryModel - update', () => {

    })
    
})