# Path syntax

> _router5_ uses [path-parser](https://github.com/troch/path-parser) for parsing, matching and generating URLs

## Defining parameters

Four parameter types are supported:

- `:param`: url parameters
- `;matrix`: matrix parameters
- `*splat`: for parameters spanning over multiple segments. Splat parameters are greedy and could swallow a
large part of your URL. It is recommended to handle with care and to ONLY use on routes without children.
- `?param1&param2` or `?:param1&:param2`: query parameters


## Constrained parameters

Url and matrix parameters can be constrained with a regular expression. Backslashes need to be escaped.

- `:param<\\d+>` will match numbers only for parameter param
- `;id<[a-fA-F0-9]{8}>` will match 8 characters hexadecimal strings for parameter id

Constraints are also applied when building paths: when passing incorrect params to `.navigate()`,
an error will be thrown.
