// tests/users.test.js

const mockPrismaFindUnique = jest.fn();

jest.mock('../prisma/prisma', () => ({
    user: {
        findUnique: mockPrismaFindUnique,
    },
}));

const controllers = require("../controllers");


describe("users controller test suite", () => {
    let mockRequest;
    let mockResponse;
    const mockNext = jest.fn();
    let consoleErrorSpy;

    beforeEach(() => {
        mockRequest = {
            params: {
                userId: "user-1"
            }
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


    describe("getUserInfo method tests", () => {

        // AUTHOR ROLE TEST BLOCK
        test("should return a 200 status with userInfo object if id passed in correctly (AUTHOR)", async () => {
            const userInfo = { id: 'user-1', username: 'testuser', role: 'AUTHOR' };
            mockPrismaFindUnique.mockResolvedValue(userInfo);

            await controllers.getUserInfo(mockRequest, mockResponse, mockNext);

            expect(mockPrismaFindUnique).toHaveBeenCalledWith({
                select: {
                    id: true,
                    role: true,
                    username: true
                },
                where: {
                    "id": "user-1"
                }
            });

            expect(mockResponse.status).toHaveBeenCalledWith(200);

            expect(mockResponse.json).toHaveBeenCalledWith({
                message: 'user info retrieved!',
                data: {
                    id: "user-1",
                    username: 'testuser',
                    role: 'AUTHOR',
                }
            });
        });

        test("should return a 404 status with appropriate message if no id is entered (AUTHOR)", async () => {
            mockRequest.params.userId = null;
            mockPrismaFindUnique.mockResolvedValue(null);

            await controllers.getUserInfo(mockRequest, mockResponse, mockNext);

            expect(mockPrismaFindUnique).toHaveBeenCalledWith({
                select: {
                    id: true,
                    role: true,
                    username: true
                },
                where: {
                    "id": null
                }
            });

            expect(mockResponse.status).toHaveBeenCalledWith(404);
            expect(mockResponse.json).toHaveBeenCalledWith({ message: 'user not found' });
        });

        // BASIC ROLE TEST BLOCK
        test("should return a 200 status with userInfo object if id passed in correctly (BASIC)", async () => {
            const userInfo = { id: 'user-1', username: 'testuser', role: 'BASIC' };
            mockPrismaFindUnique.mockResolvedValue(userInfo);

            await controllers.getUserInfo(mockRequest, mockResponse, mockNext);

            expect(mockPrismaFindUnique).toHaveBeenCalledWith({
                select: {
                    id: true,
                    role: true,
                    username: true
                },
                where: {
                    "id": "user-1"
                }
            });

            expect(mockResponse.status).toHaveBeenCalledWith(200);

            expect(mockResponse.json).toHaveBeenCalledWith({
                message: 'user info retrieved!',
                data: {
                    id: "user-1",
                    username: 'testuser',
                    role: 'BASIC',
                }
            });
        });

        test("should return a 404 status with appropriate message if no id is entered (BASIC)", async () => {
            mockRequest.params.userId = null;
            mockPrismaFindUnique.mockResolvedValue(null);

            await controllers.getUserInfo(mockRequest, mockResponse, mockNext);

            expect(mockPrismaFindUnique).toHaveBeenCalledWith({
                select: {
                    id: true,
                    role: true,
                    username: true
                },
                where: {
                    "id": null
                }
            });

            expect(mockResponse.status).toHaveBeenCalledWith(404);
            expect(mockResponse.json).toHaveBeenCalledWith({ message: 'user not found' });
        });
    });
});
