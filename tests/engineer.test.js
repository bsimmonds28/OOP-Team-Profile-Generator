const Engineer = require('../lib/engineer.js');

describe('Engineer', () => {
    describe('Initialization', () => {
      it('should create an object with name, Id, email, and github', () => {
        const engineer = new Engineer('Doe', 6, 'email', 'github');

        expect(engineer.getName()).toBe('Doe');
        expect(engineer.getId()).toBe(6);
        expect(engineer.getEmail()).toBe('email');
        expect(engineer.getGithub()).toBe('github');
        expect(engineer.getRole()).toBe('Engineer');
      });
    });
  });