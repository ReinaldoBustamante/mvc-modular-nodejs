import { prisma } from '../../src/config/db'
import { CustomError } from '../../src/errors/CustomError'
import { CategoryModel } from '../../src/models'

jest.mock('../../src/config/db', () => ({
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
            const mockCategory = { id: 1, name: 'ahorro', budget: 2400, user_id: 1 };
            (prisma.categories.findUnique as jest.Mock).mockResolvedValue(mockCategory)
            const category = await categoryModel.findCategory(mockCategory.name, mockCategory.user_id)
            expect(category).toEqual(mockCategory);
        })
        it('', async () => {
            (prisma.categories.findUnique as jest.Mock).mockRejectedValue(new Error(''))
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
            const mockCategory = { id: 1, name: 'ahorro', budget: 2400, user_id: 1 };
            (prisma.categories.findUnique as jest.Mock).mockResolvedValue(mockCategory);
            const categoryFound = await categoryModel.findCategoryById(1, 1);
            expect(categoryFound).toEqual(mockCategory);
        })
        it('', async () => {
            (prisma.categories.findUnique as jest.Mock).mockRejectedValue(new Error(''));
            const categoryFound = categoryModel.findCategoryById(1, 1);
            await expect(categoryFound).rejects.toThrow(CustomError.internal('Error buscando categoria'))
        })
    })

    describe('categoryModel - create', () => {
        beforeEach(() => {
            categoryModel = new CategoryModel()
            jest.clearAllMocks();
        })
        it('', async () => {
            const mockPayload = { name: 'casa', budget: 400000 };
            (prisma.categories.create as jest.Mock).mockResolvedValue({ id: 1, ...mockPayload })
            const category = await categoryModel.create(mockPayload, 1)
            expect(category).toEqual({ id: 1, ...mockPayload })
        })
        it('', async () => {
            const mockPayload = { name: '', budget: 0 };
            (prisma.categories.create as jest.Mock).mockRejectedValue(new Error(''))
            const category = categoryModel.create(mockPayload, 1)
            await expect(category).rejects.toThrow('Error creando categoria')
        })
    })

    describe('categoryModel - getAll', () => {
        beforeEach(() => {
            categoryModel = new CategoryModel()
            jest.clearAllMocks();
        })
        const mockCategories = [
            {
                id: 1,
                name: "casa"
            },
            {
                id: 2,
                name: "comida"
            }
        ];
        it('', async () => {
            (prisma.categories.findMany as jest.Mock).mockResolvedValue(mockCategories)
            const allCategories = await categoryModel.getAll(1);
            expect(allCategories).toEqual(mockCategories);
        })

        it('', async () => {
            (prisma.categories.findMany as jest.Mock).mockRejectedValue(new Error(''))
            const allCategories = categoryModel.getAll(1);
            await expect(allCategories).rejects.toThrow('Error buscando categorias')
        })
    })

    describe('categoryModel - delete', () => {
        beforeEach(() => {
            categoryModel = new CategoryModel()
            jest.clearAllMocks();
        })
        it('', async () => {
            const categoryDeletedMock = {id: 1, name: 'casa', budget: 1200};
            (prisma.categories.delete as jest.Mock).mockResolvedValue(categoryDeletedMock);
            const categoryDeleted = await categoryModel.delete(1, 1)
            expect(categoryDeleted).toBe(categoryDeletedMock);
        })
        it('', async () => {
            (prisma.categories.delete as jest.Mock).mockRejectedValue(new Error (''));
            const categoryDeleted = categoryModel.delete(1, 1);
            await expect(categoryDeleted).rejects.toThrow('Error eliminando categoria')
        })

    })

    describe('categoryModel - update', () => {
        beforeEach(() => {
            categoryModel = new CategoryModel()
            jest.clearAllMocks();
        })
        it('', async () => {
            const categoryUpdateMock = {id: 1, name: 'comida', budget: 1300};
            (prisma.categories.update as jest.Mock).mockResolvedValue(categoryUpdateMock);
            const categoryUpdated = await categoryModel.update(1, categoryUpdateMock);
            expect(categoryUpdated).toBe(categoryUpdateMock)
        })
        it('', async () => {
            const categoryUpdateMock = {id: 1, name: 'comida', budget: 1300};
            (prisma.categories.update as jest.Mock).mockRejectedValue(new Error());
            const categoryUpdate = categoryModel.update(1, categoryUpdateMock);
            await expect(categoryUpdate).rejects.toThrow('Error editando categoria');
        })
    })

})