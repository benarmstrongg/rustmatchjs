import { matchDefault, MatchExprArmMatcherFn, matchFn, matchValue } from "../arm";

describe('matchValue', () => {
    it('should create MatchExprArm obj with matcher and res', () => {
        const cb = () => 'test';
        const arm = matchValue('test', cb);
        expect(arm.matcher).toEqual('test');
        expect(arm.res).toEqual(cb);
    });
});

describe('matchDefault', () => {
    it('should create MatchExprDefaultArm obj with res', () => {
        const cb = () => 'test';
        const arm = matchDefault(cb);
        expect(arm.__isDefaultArm).toEqual(true);
        expect(arm.matcher).toEqual(null);
        expect(arm.res).toEqual(cb);
    })
});

describe('matchFn', () => {
    it('should create MatchExprArm obj with MatchExprArmMatcherFn matcher and res', () => {
        const fn = (val: number) => val === 7;
        const cb = () => 'test';
        const arm = matchFn(fn, cb);
        const matcher = arm.matcher as MatchExprArmMatcherFn<number>;
        expect(matcher.__IsFnArm).toEqual(true);
        expect(matcher.fn).toEqual(fn);
        expect(arm.res).toEqual(cb);
    });
});