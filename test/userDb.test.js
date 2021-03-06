const chai = require('chai');

chai.should();
// const sinon = require('sinon');
const expect = chai.expect;

const db = require('../src/userDb');

const temp = {
  id: 'amachhab@cisco.com',
  email: 'demo1@cisco.com',
  message: 'Test message. ',
};

describe('Database Functions', () => {
  it('Should add email to user object', async () => {
    const user = await db.addEmail(temp.id, temp.email);
    user.should.have.property('iotGroup');
    user.iotGroup.should.be.an('Array').that.includes(temp.email);
    user.should.have.property('_id');
    user._id.should.equal(temp.id);
  });
  it('Should remove email from user object', async () => {
    const user = await db.removeEmail(temp.id, temp.email);
    user.should.have.property('iotGroup');
    user.iotGroup.should.be.an('Array').that.does.not.include(temp.email);
    user.should.have.property('_id');
    user._id.should.equal(temp.id);
  });
  it('Should add a message to the user object', async () => {
    const user = await db.addMessage(temp.id, temp.message);
    user.should.have.property('iotMessage');
    user.iotMessage.should.equal(temp.message);
    user.should.have.property('_id');
    user._id.should.equal(temp.id);
  });
  it('Should list all group emails. ', async () => {
    const user = await db.getUser(temp.id);
    user.iotGroup.should.be.an('Array');
  });
});
