// tests/sessions.test.js

const mockSetHeader = jest.fn();

const fetch = jest.fn();
global.fetch = fetch;

jest.mock("../prisma/prisma", () => ({
    user: {
        findUnique: jest.fn(),
    },
}));

const mockJwtSign = jest.fn();
jest.mock('jsonwebtoken', () => ({
    sign: mockJwtSign,
}));

const mockBcryptCompare = jest.fn();
jest.mock('bcryptjs', () => ({
    compare: mockBcryptCompare,
}));

const controllers = require("../controllers");
const prisma = require("../prisma/prisma");


describe("login controller tests for user with BASIC role", () => {
    let mockResponse;
    let mockRequest;
    const mockNext = jest.fn();

    // role?
    // might be needed for further tests on ui rendering, but might be frontend tests
    const MOCK_USER = { id: 'test-user-id', name: 'testuser', };

    beforeEach(() => {
        mockResponse = {
            status: jest.fn(() => mockResponse),
            send: jest.fn(),
            json: jest.fn(),
            setHeader: mockSetHeader,
            locals: {
                currentUser: MOCK_USER
            }
        };

        mockRequest = {
            user: MOCK_USER,
            params: {},
            body: {
                username: 'testuser',
                password: 'password123',
            }
        };
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe("getSessionStatus tests", () => {
        test('should send 200 status with user data if authenticated (via req.user)', async () => {
            const mockPosts = [{ id: 'post1', name: 'post 1' }];
            prisma.user.findUnique.mockResolvedValue({ posts: mockPosts });

            await controllers.getSessionStatus(mockRequest, mockResponse, mockNext);

            expect(prisma.user.findUnique).toHaveBeenCalledWith({
                where: { id: MOCK_USER.id },
                include: {
                    posts: {
                        orderBy: { id: 'asc' }
                    }
                },
            });
            expect(mockResponse.status).toHaveBeenCalledWith(200);
            expect(mockResponse.json).toHaveBeenCalledWith({
                message: 'User data retrieved successfully',
                user: MOCK_USER,
                data: mockPosts,
            });
        });

        test('should call next with an error if prisma fails', async () => {
            const mockError = new Error('Database connection failed');
            prisma.user.findUnique.mockRejectedValue(mockError);

            await controllers.getSessionStatus(mockRequest, mockResponse, mockNext);

            expect(mockNext).toHaveBeenCalledWith(mockError);
        });

        test('should send 404 status if user not found', async () => {
            prisma.user.findUnique.mockResolvedValue(null);

            await controllers.getSessionStatus(mockRequest, mockResponse, mockNext);

            await controllers.getSessionStatus(mockRequest, mockResponse, mockNext);

            expect(mockResponse.status).toHaveBeenCalledWith(404);
            expect(mockResponse.json).toHaveBeenCalledWith({ message: 'User not found.' });

        });

    });
});