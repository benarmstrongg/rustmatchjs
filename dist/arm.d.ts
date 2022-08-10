export declare type MatchExprArm<I, O> = {
    matcher: MatchExprArmMatcher<I>;
    res: MatchExprArmValue<I, O>;
};
export declare type MatchExprDefaultArm<I, O> = MatchExprArm<I, O> & {
    res: ((_: any) => O) | O;
    __rustmatchjsIsDefaultArm: true;
};
export declare type MatchExprArmMatcher<I> = I | MatchExprArmMatcherFn<I>;
export declare type MatchExprArmMatcherFn<I> = {
    fn: (value: I) => boolean;
    __rustmatchjsIsConditionalMatcher: true;
};
export declare type MatchExprArmValue<I, O> = O | ((value: I) => O);
export declare function matchValue<I, O>(matcher: MatchExprArmMatcher<I>, res: MatchExprArmValue<I, O>): MatchExprArm<I, O>;
export declare function matchDefault<O>(res: ((_: any) => O) | O): MatchExprDefaultArm<any, O>;
export declare function matchFn<I, O>(fn: (value: I) => boolean, res: MatchExprArmValue<I, O>): MatchExprArm<I, O>;
