import { z } from "zod";
import { ErrorMiddleware} from '../../src/middlewares/error.middleware'
import { CustomError } from "../../src/errors/CustomError";
describe("error.middleware", () => {
    let req: any;
    let res: any;
    let next: any;

    beforeEach(() => {
        req = {};
        res = {
            status: jest.fn().mockReturnThis(), 
            json: jest.fn(),
        };
        next = jest.fn()
    });

    it('test zod Error', () => {
        // 1. Arrange
        const schema = z.object({
            email: z.string().email(),
        });
        // 2. Act
        try {
            schema.parse({ email: 123 }); 
        } catch (err) {
            ErrorMiddleware.errorHandler(err, req, res, next);
        }

        // 3. Assert
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            ok: false,
            errors: [
                {
                    field: "email",
                    message: expect.any(String),
                },
            ],
        })
    })

    it('test custom error', () => {
        // 1. Arrange
        const error = CustomError.conflict("user already exist");
        // 2. Act
        ErrorMiddleware.errorHandler(error, req, res, next);

        // 3. Assert
        expect(res.status).toHaveBeenCalledWith(409);
        expect(res.json).toHaveBeenCalledWith({
            ok: false,
            errors: [
                {
                message: "user already exist"
                }
            ]
        });
    })

    it('test internal error', () => {
        // 1. Arrange
        const error = new Error("error");
        // 2. Act
        ErrorMiddleware.errorHandler(error, req, res, next)
        // 3. Assert
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            ok: false,
            errors: [{ message: "Internal Server Error" }],
        })
        
    })
})