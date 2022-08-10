export type MatchExprArm<I, O> = {
    matcher: MatchExprArmMatcher<I>;
    res: MatchExprArmResolver<I, O>;
    __input?: I
};
export type MatchExprDefaultArm<I, O> = MatchExprArm<I, O> & {
    res: (() => O) | O;
    __isDefaultArm: true;
};

export type MatchExprArmMatcher<I> = I | MatchExprArmMatcherFn<I>;
export type MatchExprArmMatcherFn<I> = {
    fn: (value: I) => boolean;
    __IsFnArm: true;
};

export type MatchExprArmResolver<I, O> = O | (() => O);

export function matchValue<I, O>(val: I, res: MatchExprArmResolver<I, O>): MatchExprArm<I, O> {
    return { matcher: val, res };
}

export function matchDefault<O>(res: ((_: any) => O) | O): MatchExprDefaultArm<any, O> {
    return {
        matcher: null as any,
        res: res as MatchExprArmResolver<any, O>,
        __isDefaultArm: true
    };
}

export function matchFn<I, O>(fn: (value: I) => boolean, res: MatchExprArmResolver<I, O>): MatchExprArm<I, O> {
    const matcher: MatchExprArmMatcher<I> = { fn, __IsFnArm: true };
    return { matcher, res };
}