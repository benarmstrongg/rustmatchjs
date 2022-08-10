// @ts-check

import match from './dist/index';

const str = 88;

const res = match(str,
    match.v('hello', 'world'),
    match.fn(my => true, 'hjkhdajk'),
    match._(_ => 'sajkhld')
);

console.log(res)