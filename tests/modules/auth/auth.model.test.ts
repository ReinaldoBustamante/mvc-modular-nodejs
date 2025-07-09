import { prisma } from '../../../src/config/db'
import { AuthModel } from '../../../src/modules/auth/auth.model'

jest.mock('../../../src/config/db', () => ({
    prisma: {
        user: {
            findUnique: jest.fn(),
            create: jest.fn()
        }
    }
}))

describe('', () => {
    let authModel: AuthModel
    beforeEach(() => {
        authModel = new AuthModel();
    })
    
    it('', async () => {
        const mockUser = { id: 1, email: 'test@example.com'};
        (prisma.user.findUnique as jest.Mock).mockResolvedValue(mockUser);

        const result = await authModel.findUser('test@example.com')

        expect(result).toEqual(mockUser);

    })

    it('', async () => {
        (prisma.user.findUnique as jest.Mock).mockRejectedValue(new Error());

        const result = authModel.findUser('test@example.com')

        await expect(result).rejects.toThrow('Error al buscar usuario')

    })
})

describe('', () => {
    let authModel: AuthModel
    beforeEach(() => {
        authModel = new AuthModel();
    })

    it('', async () => {
        const mockUser = { id: 1,email: 'test@example.com', name: "testName", password: "testPassword" };
        (prisma.user.create as jest.Mock).mockResolvedValue(mockUser)

        const result = await authModel.registerUser({
            email: "a",
            name: "a",
            password: "a"
        })
        expect(result).toEqual(mockUser);
    })

    it('', async () => {
        (prisma.user.create as jest.Mock).mockRejectedValue(new Error());
        
        const result = authModel.registerUser({
            email: "a",
            name: "a",
            password: "a"
        })
        await expect(result).rejects.toThrow('Error al registrar usuario')
    })
})