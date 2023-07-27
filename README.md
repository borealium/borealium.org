# Divvun Portal

This uses [Lume](https://lume.land/docs/overview/about-lume/).

## Dev

```
deno task serve
```

Update tools index:

```
deno run --allow-net --allow-write utils/fetch-tools-index.ts
```

All the JSX being red and angry?

```
deno cache src/templates/layouts/*.tsx
```
