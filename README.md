## Nest Prisma Template

A template for creating API services based on [NestJS](https://nestjs.com/) and [Prisma](https://www.prisma.io/).

<br/>

This is the template I use a lot myself.
I have removed some unnecessary dependencies from the NestJS template to reduce the weight of the project,
and added some best practices related to Prisma.

If you like it, click the <kbd>Use this template</kbd> button on GitHub to use it.

## Guide

A Docker configuration for PostgreSQL has been prepared in the project, run `yarn up` to mount the database directly.

1. Run `yarn` to install deps.
2. Run `prisma generate` to generate prisma types.
3. Run `prisma migrate dev` to migrate database to latest version.
4. Run `yarn dev` lift server.

## LICENSE

[MIT](./LICENSE)
