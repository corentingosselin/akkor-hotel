# AkkorHotel

<a alt="Nx logo" href="https://nx.dev" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="45"></a>

✨ **This workspace has been generated by [Nx, a Smart, fast and extensible build system.](https://nx.dev)** 


## Running akkor hotel application

Install docker, you can use docker desktop: https://www.docker.com/products/docker-desktop/   
Install pnpm: `npm i pnpm`  
Execute this command: `pnpm run start`

Now you can connect to the frontend: http://localhost:8080

You can access to the api documentation here: http://localhost:4000/api

You can register and get an admin user by updating the role of a normal user
You need to connect to the database, and change the role manually from user to admin in the column section.  This process is for security reasons.


## Running tests

If you started the app with pnpm run start, you must stop the containers before running test. You can use: `pnpm run docker:stop`


1. Start the test containers first with: `pnpm run docker:test`   
2. Then run tests: `nx affected:test`
3. You can also run test without cache: `pnpm run test` 


## Development server

Run `nx serve backend` for a dev server. Navigate to http://localhost:4000/. The app will automatically reload if you change any of the source files.

Run `nx serve frontend` for a dev server. Navigate to http://localhost:4200/. The app will automatically reload if you change any of the source files.

## Understand this workspace

Run `nx graph` to see a diagram of the dependencies of the projects.
