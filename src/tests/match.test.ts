import { match } from "../match";

describe('match', () => {
    it('should use value if matching arm has value matcher', () => {
        const val = match('test',
            match.val('testttt', () => 'almost'),
            match.val('test', () => 'yes'),
            match.default(_ => 'no')
        );
        expect(val).toEqual('yes');
    });

    it('should use matcher fn if matching arm has MatchExprArmMatcherFn matcher', () => {
        const falseFn = jest.fn((_val: string) => false);
        const fn = jest.fn((_val: string) => true);
        const val = match('test',
            match.val('not test', () => 'no'),
            match.fn(falseFn, () => 'no'),
            match.fn(fn, () => 'yes'),
            match.default(_ => 'no')
        );
        expect(falseFn).toHaveBeenCalledWith('test');
        expect(fn).toHaveBeenCalledWith('test');
        expect(val).toEqual('yes');
    });

    it('should use res value if value is passed', () => {
        const val = match('test',
            match.fn(val => val === 'not test', () => 'no'),
            match.val('not test', 'no'),
            match.val('test', 'yes'),
            match.default(_ => 'no')
        );
        expect(val).toEqual('yes');
    });

    it('should use return value of res fn if function is passed', () => {
        const fn = jest.fn((val: string) => 'yes');
        const val = match('test',
            match.val('not test', 'no'),
            match.fn(val => val === 'not test', () => 'no'),
            match.fn(val => val === 'test', fn),
            match.default(_ => 'no')
        );
        expect(fn).toHaveBeenCalledWith('test');
        expect(val).toEqual('yes');
    });

    it('should use default arm if no arms match', () => {
        const testValue = 'test';
        const val = match(testValue,
            match.val('testt', 'ok'),
            match.fn(val => val === 'test2', 'ok'),
            match.default(_ => 'no match')
        );
        expect(val).toEqual('no match');
    })
});