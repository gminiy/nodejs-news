const mongoose = require('mongoose');

describe('authController', () => {
    const authController = require('../../routes/auth/auth-controller');
    const Model = mongoose.Model;
    Model.prototype.save = jest.fn(function () {
        return new Promise ((resolve, reject) => {
            resolve({
                "email": this.email, 
                "password": this.password,
                "nickname": this.nickname
            })
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

    it('regist successfully', async () => {
        const sentData = await authController.regist(mockRequest, mockResponse);
        
        expect(sentData).toEqual(mockUserInfo);
    });

    it('regist without email', async () => {
        delete mockUserInfo.email;
        await authController.regist(mockRequest, mockResponse);
        
        expect(mockResponse.status).toHaveBeenCalledWith(409);
    });
});