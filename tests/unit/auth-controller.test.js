const mongoose = require('mongoose');
const crypto = require('crypto');
const { secret } = require('../../configs/config')

describe('authController', () => {
    const authController = require('../../routes/auth/auth-controller');
    const Model = mongoose.Model;
    Model.prototype.save = jest.fn(function () {
        return new Promise ((resolve, reject) => {
            resolve(this);
        });
    });

    const mockUserInfo = {
        "email": 'abc@naver.com',
        "password": 'abc123',
        "nickname": 'nick'
    };

    const mockRequest = {
        "body": mockUserInfo
    };

    const mockResponse = {
        "status": jest.fn().mockReturnValue(this),
        "send": (data) =>  data
    };

    const encrypted = crypto.createHmac('sha1', secret)
        .update(mockUserInfo.password)
        .digest('base64')

    it('regist successfully', async () => {
        const sentData = await authController.regist(mockRequest, mockResponse);
        
        expect(sentData).toEqual(expect.objectContaining({ email: mockUserInfo.email, password: encrypted, nickname:mockUserInfo.nickname }));
    });

    it('regist without email', async () => {
        delete mockUserInfo.email;
        await authController.regist(mockRequest, mockResponse);
        
        expect(mockResponse.status).toHaveBeenCalledWith(409);
    });
});