# Angoid

Client portion of the repro solution for using a simple OpenIdDict-based, credentials flow .NET core web API, with an Angular2 client.

This client just has a login/logout buttons pair, and a button used to access a protected API resource.

The web API database is in-memory (EF Core). Just use `zeus` as username and `P4ssw0rd!` as password.

The authentication service is located under shared/services. It uses two endpoints: `connect/token` to get the token, and `connect/userinfo` to get the user information using the token just got.

The token is stored in the local storage for the current session, together with user information. When storing the token, its expiration date is calculated (all datetimes are UTC). You can find the user and token models in `shared/models/common.ts`.

The same service also provides some essential authentication helpers:

- `isAuthenticated` to check if user is authenticated (and verified).
- `createAuthHeaders` to create headers with bearer authentication.

A settings service provides URL and other constants.

Issue: login and user info work fine; when accessing the protected resource in the API server, I always get a 401.

## Angular-CLI Stuff

This project was generated with [angular-cli](https://github.com/angular/angular-cli) version 1.0.0-beta.19-3.

### Development Server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive/pipe/service/class`.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

### Deploying to Github Pages

Run `ng github-pages:deploy` to deploy to Github Pages.

### Further help

To get more help on the `angular-cli` use `ng --help` or go check out the [Angular-CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
