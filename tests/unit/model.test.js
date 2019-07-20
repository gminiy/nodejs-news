const mongoose = require('mongoose');

describe('model', () => {
    describe('user', () => {
        it('create', () => {
            const User = require('../../model/user');
            const Model = mongoose.Model;
            const [ mockEmail, mockPassword, mockNickname ] = [ 'abc@naver.com', 'abc123', 'nick' ];
            Model.prototype.save = jest.fn(function () {
                return [this.email, this.password, this.nickname];
            });
            expect(User.create(mockEmail, mockPassword, mockNickname)).toEqual([mockEmail, mockPassword, mockNickname]);
        });
    });
})