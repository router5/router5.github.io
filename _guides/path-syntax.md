# Path syntax

## Defining parameters

_router5_ uses [path-parser](https://github.com/troch/path-parser) for parsing, matching and generating URLs. It supports four parameter types:

- `:param`: url parameters
- `;matrix`: matrix parameters
- `*splat`: for parameters spanning over multiple segments. Splat parameters are greedy and could swallow a
large part of your URL. It is recommended to handle with care and to ONLY use on routes without children.
- `?param1&param2` or `?:param1&:param2`: query parameters


## Optional parameters

In development.

## Constrained parameters

In development.
