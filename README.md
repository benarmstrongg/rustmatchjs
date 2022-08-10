# rustmatchjs

![ts](https://badgen.net/badge/-/TypeScript?icon=typescript&label&labelColor=blue&color=555555)
![bundle size](https://img.badgesize.io/benarmstrongg/rustmatchjs/main/dist/index.js)
![bundle size](https://img.badgesize.io/benarmstrongg/rustmatchjs/main/dist/index.js?compression=gzip)

Rust `match` is cool. I wish it were in js.

This package provides a set of functions to replicate the Rust language's `match` expression. Unlike the `switch` statement in Javascript, `match` is an expression, which makes it perfect for conditionally assigning one value based on another in a readable way.

The first matching arm will be executed and its value returned. For `match.val` arms, a shallow comparison is performed to allow matching on objects. Thanks to some magic from Typescript, this can come kinda close to Rust `match`. The input type, `I`, will be inferred from the first argument and the output type, `O`, will be inferred from the type or return type of the first arm's `res` arg. Finally, a default arm *must* be included as the last argument. Since Typescript can't make sure your branches are exhaustive, this ensures some value is always returned.

## Usage:
```typescript
const message = match(response,
    match.val({ ...response, code: 200, error: null }, 'Fetched successfully!'),
    match.val({ ...response, code: 404 }, () => {
        console.log('Not found');
        return '404 :0';
    }),
    match.fn(response => response.code >= 500 && response.code < 600, () => {
        console.log(`Server error ${response.code}. Err: ${response.error}`);
        return 'Not your fault friend';
    }),
    match.default('I do not know how to handle this'),
    // alias for match.default
    match._(() => 'I do not know how to handle this')
);
```