const mongoose = require('mongoose');

describe('model', () => {
    describe('user', () => {
        it('create', () => {
            const User = require('../../model/user');
            const Model = mongoose.Model;
            const [ mockEmail, mockPassword ] = [ 'abc@naver.com', 'abc123' ];
            Model.prototype.save = jest.fn(function () {
                return [this.email, this.password];
            });
            expect(User.create(mockEmail, mockPassword)).toEqual([mockEmail, mockPassword]);
        });
    });
})