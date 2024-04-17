# BirdHouse Admin Panel

# Project Setup

## -- With Docker Compose

### Build image

```sh
docker-compose build
```

### Start the Docker Container

```sh
docker-compose up
```

## -- With Yarn

```sh
yarn install
```

### Compile and Hot-Reload for Development

```sh
yarn dev
```

### Type-Check, Compile and Minify for Production

```sh
yarn build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

<br/>

# Project Outline

## Folder Structure

| Folder      | Description                                      |
| ----------- | ------------------------------------------------ |
| Assets      | Project assets, style sheets inclusive           |
| Components  | Components and reusable icons within the system. |
| Composables | Modular reusable state and logic                 |
| Layouts     | Page layout for the system                       |
| Router      | Application routes and configurations            |
| Stores      | State management module for the system           |
| Types       | Reusable type definitons and interfaces          |
| Views       | Pages for existing routes within the system      |

<br/>

# Thought Process

From the top level, the idea was to have a proper folder structure, serving as the first line of documentation.
I'm also a big proponent of the `Single responsibility principle`, ensuring that a module is responsible to one 'actor'.

Subsequently, I opted for a single entry point for calls to the server via `axios.Config.ts`. Besides creating the axios instance,
the file also serves as the first line of interception for errors and would extend to an errorhandler. However, a robust error handler
wasn't exactly a necessity considering the nature and size of the current system. Used a plain console.log statement to suffice.

### Challenges

The first unique challenge i'd say was retrieving the registered houses, making the subsequent call(s) to retrieve the occupancy data and
then sorting both data to get the final payload.

The idea was to first retrieve all the houses, create a map (for fast look up) with the `ubidValue` as the unique key and the occupancy data for each respective house as the value.

Next was to get the total occupancy data (eggs and birds) for each house and then return a single object with the initial house details and the total occupancy data.

This is housed in the `useBirdHouse` composable.

The next challenge was computing the graph data. Each birdhouse has various occupants, with an occupant housing the birds, eggs and `created_at` values. The idea here was to group each occupant by the day of the week they were created. Subsequently got a total of the birds and eggs of each occupancy based on the said day of creation, then used that to plot the graph on the y-axis, having the x-axis represent the days of the week.
