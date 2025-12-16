// tests/login.test.js

// TODO: EDIT AND CREATE ALL TEST FILES

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

    // do not need role to login
    const MOCK_USER = { id: 'test-user-id', username: 'testuser', };

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

    describe("postLogin tests", () => {

        test('should return 401 for invalid username', async () => {
            prisma.user.findUnique.mockResolvedValue(null);

            await controllers.postLogin(mockRequest, mockResponse, mockNext);

            expect(mockResponse.status).toHaveBeenCalledWith(401);
            expect(mockResponse.json).toHaveBeenCalledWith({ message: "Invalid credentials." });
            expect(mockBcryptCompare).not.toHaveBeenCalled();
            expect(mockJwtSign).not.toHaveBeenCalled();
        });

        test('should return 401 for incorrect password', async () => {
            const mockDbUser = { id: 'user-id', username: 'testuser', password: 'hashedpassword' };
            prisma.user.findUnique.mockResolvedValue(mockDbUser);
            mockBcryptCompare.mockResolvedValue(false); // mismatch

            await controllers.postLogin(mockRequest, mockResponse, mockNext);

            expect(mockBcryptCompare).toHaveBeenCalledWith('password123', 'hashedpassword');
            expect(mockResponse.status).toHaveBeenCalledWith(401);
            expect(mockResponse.json).toHaveBeenCalledWith({ message: "Invalid credentials." });
            expect(mockJwtSign).not.toHaveBeenCalled();
        });

        test('should return 200 with JWT token and user data on successful login', async () => {
            const mockDbUser = { id: 'user-id-1', username: 'testuser', password: 'hashedpassword' };
            const MOCK_TOKEN = 'mock.jwt.token';
            prisma.user.findUnique.mockResolvedValue(mockDbUser);
            mockBcryptCompare.mockResolvedValue(true); // match
            mockJwtSign.mockReturnValue(MOCK_TOKEN);

            await controllers.postLogin(mockRequest, mockResponse, mockNext);

            expect(prisma.user.findUnique).toHaveBeenCalledWith({ where: { username: 'testuser' } });

            // token
            expect(mockJwtSign).toHaveBeenCalledWith(
                { id: 'user-id-1', username: 'testuser' },
                expect.any(String), // SECRET_KEY
                { expiresIn: '1d' }
            );

            // response
            expect(mockResponse.status).toHaveBeenCalledWith(200);
            expect(mockResponse.json).toHaveBeenCalledWith({
                message: "Login successful",
                token: "Bearer " + MOCK_TOKEN,
                data: { id: 'user-id-1', username: 'testuser' }
            });
        });

        test('should call next with an error if an exception occurs', async () => {
            const mockError = new Error('Database error during login');
            prisma.user.findUnique.mockRejectedValue(mockError);

            await controllers.postLogin(mockRequest, mockResponse, mockNext);

            expect(mockNext).toHaveBeenCalledWith(mockError);
        });

    });
});