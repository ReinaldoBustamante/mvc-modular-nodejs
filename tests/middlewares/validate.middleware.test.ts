import z from 'zod'
import '../../src/middlewares/validate.middleware'
import { ValidateMiddleware } from '../../src/middlewares/validate.middleware'
import { NextFunction, Response } from 'express';

describe('', () => {
    let req: any;
    let res: any;
    let next: jest.Mock;
    let schema: any;
    let middleware: any;

    beforeEach(() => {
        req = { body: {} };
        res = {};
        next = jest.fn();
        schema = z.object({
            email: z.string().email()
        })
        middleware = ValidateMiddleware.validate(schema)
    });

    it('should be throw error', () => {
        req.body = { email: '123' }
        middleware(req, res, next);
        expect(next).toHaveBeenCalledTimes(1);
        expect(next).toHaveBeenCalledWith(expect.any(z.ZodError));
    })

    it('should be pass', () => {
        req.body = { email: 'reinaldo.bustamante@gmail.com'}
        middleware(req, res, next);
        expect(next).toHaveBeenCalledTimes(1);
        expect(next).toHaveBeenCalledWith();
    })
})