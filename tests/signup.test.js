// tests/signup.test.js

const mockValidationResult = jest.fn();
const mockBcryptHash = jest.fn();
const mockPrismaUserCreate = jest.fn();

jest.mock('express-validator', () => {
    const mockChain = {
        isAlpha: jest.fn(() => mockChain),
        notEmpty: jest.fn(() => mockChain),
        withMessage: jest.fn(() => mockChain),
        isLength: jest.fn(() => mockChain),
        custom: jest.fn(() => mockChain),
    };

    return {
        validationResult: mockValidationResult,
        body: jest.fn(() => mockChain),
    };
});

jest.mock('bcryptjs', () => ({
    hash: mockBcryptHash,
}));

jest.mock('../prisma/prisma', () => ({
    user: {
        create: mockPrismaUserCreate,
    },
}));

const controllers = require("../controllers");


describe("sign-up controller test suite", () => {
    let mockRequest;
    let mockResponse;
    const mockNext = jest.fn();
    let consoleErrorSpy;

    beforeEach(() => {
        mockRequest = {
            body: {
                username: 'testuser',
                password: 'password123',
                confirmPassword: 'password123',
                role: 'BASIC',
            },
        };
        mockResponse = {
            status: jest.fn(() => mockResponse),
            json: jest.fn(),
        };

        consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => { });

        jest.clearAllMocks();
    });

    afterEach(() => {
        consoleErrorSpy.mockRestore();
    });


    describe("post request (postSignUp) for a user with BASIC role", () => {
        test("should create a new user with BASIC role and send 201 status on successful validation", async () => {
            mockValidationResult.mockReturnValue({
                isEmpty: () => true,
                array: () => [],
            });

            const hashedPw = 'hashed_password_123';
            mockBcryptHash.mockResolvedValue(hashedPw);

            const newUser = { id: 'user-1', username: 'testuser', password: hashedPw, role: 'BASIC' };
            mockPrismaUserCreate.mockResolvedValue(newUser);

            await controllers.postSignUp(mockRequest, mockResponse, mockNext);

            expect(mockValidationResult).toHaveBeenCalledWith(mockRequest);
            expect(mockBcryptHash).toHaveBeenCalledWith('password123', 10);

            expect(mockPrismaUserCreate).toHaveBeenCalledWith({
                data: {
                    username: 'testuser',
                    password: hashedPw,
                    role: 'BASIC',
                },
            });

            expect(mockResponse.status).toHaveBeenCalledWith(201);

            expect(mockResponse.json).toHaveBeenCalledWith({
                message: 'User created successfully',
                data: {
                    name: 'testuser',
                    role: 'BASIC',
                }
            });
        });


        test('should send 400 status if validation fails', async () => {
            const errors = [{ msg: 'Please enter a username' }];
            mockValidationResult.mockReturnValue({
                isEmpty: () => false,
                array: () => errors,
            });

            await controllers.postSignUp(mockRequest, mockResponse, mockNext);

            expect(mockValidationResult).toHaveBeenCalledWith(mockRequest);
            expect(mockResponse.status).toHaveBeenCalledWith(400);

            expect(mockResponse.json).toHaveBeenCalledWith({
                message: 'Validation failed',
                errors: errors,
            });

            expect(mockBcryptHash).not.toHaveBeenCalled();
            expect(mockPrismaUserCreate).not.toHaveBeenCalled();
        });

        test('should send 500 status if an error occurs during user creation', async () => {
            mockValidationResult.mockReturnValue({
                isEmpty: () => true,
                array: () => [],
            });

            const prismaError = new Error('Database connection failed');
            mockPrismaUserCreate.mockRejectedValue(prismaError);

            await controllers.postSignUp(mockRequest, mockResponse, mockNext);

            expect(consoleErrorSpy).toHaveBeenCalledWith("User creation error", prismaError);
            expect(mockResponse.status).toHaveBeenCalledWith(500);
            expect(mockResponse.json).toHaveBeenCalledWith({
                message: 'An error occured while creating the user',
                error: prismaError.message,
            });
        });
    });

    describe('validateUser', () => {
        // empty test to check if middleware exists
    });

});

describe("sign-up controller test suite", () => {
    let mockRequest;
    let mockResponse;
    const mockNext = jest.fn();
    let consoleErrorSpy;

    beforeEach(() => {
        mockRequest = {
            body: {
                username: 'testuser',
                password: 'password123',
                confirmPassword: 'password123',
                role: 'AUTHOR',
            },
        };
        mockResponse = {
            status: jest.fn(() => mockResponse),
            json: jest.fn(),
        };

        consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => { });

        jest.clearAllMocks();
    });

    afterEach(() => {
        consoleErrorSpy.mockRestore();
    });


    describe("post request (postSignUp) for a user with AUTHOR role", () => {
        test("should create a new user with BASIC role and send 201 status on successful validation", async () => {
            mockValidationResult.mockReturnValue({
                isEmpty: () => true,
                array: () => [],
            });

            const hashedPw = 'hashed_password_123';
            mockBcryptHash.mockResolvedValue(hashedPw);

            const newUser = { id: 'user-1', name: 'testuser', password: hashedPw, role: 'AUTHOR' };
            mockPrismaUserCreate.mockResolvedValue(newUser);

            await controllers.postSignUp(mockRequest, mockResponse, mockNext);

            expect(mockValidationResult).toHaveBeenCalledWith(mockRequest);
            expect(mockBcryptHash).toHaveBeenCalledWith('password123', 10);

            expect(mockPrismaUserCreate).toHaveBeenCalledWith({
                data: {
                    username: 'testuser',
                    password: hashedPw,
                    role: 'AUTHOR',
                },
            });

            expect(mockResponse.status).toHaveBeenCalledWith(201);

            expect(mockResponse.json).toHaveBeenCalledWith({
                message: 'User created successfully',
                data: {
                    name: 'testuser',
                    role: 'AUTHOR',
                }
            });
        });


        test('should send 400 status if validation fails', async () => {
            const errors = [{ msg: 'Please enter a username' }];
            mockValidationResult.mockReturnValue({
                isEmpty: () => false,
                array: () => errors,
            });

            await controllers.postSignUp(mockRequest, mockResponse, mockNext);

            expect(mockValidationResult).toHaveBeenCalledWith(mockRequest);
            expect(mockResponse.status).toHaveBeenCalledWith(400);

            expect(mockResponse.json).toHaveBeenCalledWith({
                message: 'Validation failed',
                errors: errors,
            });

            expect(mockBcryptHash).not.toHaveBeenCalled();
            expect(mockPrismaUserCreate).not.toHaveBeenCalled();
        });

        test('should send 500 status if an error occurs during user creation', async () => {
            mockValidationResult.mockReturnValue({
                isEmpty: () => true,
                array: () => [],
            });

            const prismaError = new Error('Database connection failed');
            mockPrismaUserCreate.mockRejectedValue(prismaError);

            await controllers.postSignUp(mockRequest, mockResponse, mockNext);

            expect(consoleErrorSpy).toHaveBeenCalledWith("User creation error", prismaError);
            expect(mockResponse.status).toHaveBeenCalledWith(500);
            expect(mockResponse.json).toHaveBeenCalledWith({
                message: 'An error occured while creating the user',
                error: prismaError.message,
            });
        });
    });

    describe('validateUser', () => {
        // empty test to check if middleware exists
    });

});