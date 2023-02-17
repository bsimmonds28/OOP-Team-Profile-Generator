const Employee = require('../lib/employee.js');

describe('Employee', () => {
    describe('Initialization', () => {
      it('should create an object with name, Id, email', () => {
        const employee = new Employee('Jane', 5, 'email');

        expect(employee.getName()).toBe('Jane');
        expect(employee.getId()).toBe(5);
        expect(employee.getEmail()).toBe('email');
        expect(employee.getRole()).toBe('Employee');
      });
    });
  });
