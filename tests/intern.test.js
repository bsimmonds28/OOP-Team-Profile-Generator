const Intern = require('../lib/intern.js');

describe('Intern', () => {
    describe('Initialization', () => {
      it('should create an object with name, Id, email, and school', () => {
        const intern = new Intern('John', 7, 'email', 'school');

        expect(intern.getName()).toBe('John');
        expect(intern.getId()).toBe(7);
        expect(intern.getEmail()).toBe('email');
        expect(intern.getSchool()).toBe('school');
        expect(intern.getRole()).toBe('Intern');
      });
    });
  });