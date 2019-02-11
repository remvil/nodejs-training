const ex = require('../exercise1');

describe('fizzBuzz', () => {
    it('should throw an exception if input is not a number', () => {
        expect(() => { ex.fizzBuzz('a') }).toThrow();
        expect(() => { ex.fizzBuzz(null) }).toThrow();
        expect(() => { ex.fizzBuzz(undefined) }).toThrow();
        expect(() => { ex.fizzBuzz('') }).toThrow();
    });

    it('sholud return FizzBuzz if the input is divisible by 3 and 5', () => {
        expect(ex.fizzBuzz(15)).toBe('FizzBuzz');
    });

    it('sholud return Fizz if the input is divisible by 3', () => {
        expect(ex.fizzBuzz(3)).toBe('Fizz');
    });

    it('sholud return FizzBuzz iif the input is divisible by 5', () => {
        const args = [5, 15, 50, 25, 89];
        args.forEach( a => {
            expect(() => {ex.fizzBuzz(a).toBe('Buzz') });
        });
    });
});