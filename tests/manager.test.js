const Manager = require('../lib/manager.js');

describe('Manager', () => {
    describe('Initialization', () => {
      it('should create an object with name, Id, email, and office number', () => {
        const manager = new Manager('Smith', 8, 'email', 101);

        expect(manager.getName()).toBe('Smith');
        expect(manager.getId()).toBe(8);
        expect(manager.getEmail()).toBe('email');
        expect(manager.getOfficeNumber()).toBe(101);
        expect(manager.getRole()).toBe('Manager');
      });
    });
  });