# Borealium

This uses [Lume](https://lume.land/docs/overview/about-lume/).

## Dev

```sh
deno task serve
```

All the JSX being red and angry?

```sh
deno cache src/_includes/*.tsx
```

## Site analytics

See [borealium.org@plausible](https://plausible.io/borealium.org) (requires login for the time being).

[Plausible](https://plausible.io/) is fully GDPR compliant, does not track, and is open source.

## Scheduled builds

The site is rebuilt on each push and pull request. In addition, it is scheduled to build every hour, to make sure that
it picks up changes in the Páhkat repo regularly. If there has been no repo activities for **60** days, workflow builds
are automatically disabled.

To re-enable workflows in such a case,
[follow these instructions](https://docs.github.com/en/enterprise-server@3.12/actions/using-workflows/disabling-and-enabling-a-workflow#enabling-a-workflow). 

## Localisation

Almost all text is localised in our [Pontoon instance](https://divvun-pontoon-vm.norwayeast.cloudapp.azure.com/projects/borealium/), and soon everything will be.
