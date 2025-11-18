// tests/logout.test.js

const request = jest.fn();

const controllers = require("../controllers");

describe("logout controller tests (getLogoutMessage method)", () => {

    let mockResponse;
    let mockRequest;
    const mockNext = jest.fn();

    beforeEach(() => {
        mockResponse = {
            status: jest.fn(() => mockResponse),
            json: jest.fn(),
        };

        mockRequest = {};
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should respond with a 200 status and the correct message", async () => {
        await controllers.getLogoutMessage(mockRequest, mockResponse);

        expect(mockResponse.status).toHaveBeenCalledWith(200);

        const expectedBody = { "message": "logged out successfully. (please delete token client-side)" };
        expect(mockResponse.json).toHaveBeenCalledWith(expectedBody);
    });
});