# Web app containing multiple sub-apps using react-router.
## Description
This app contains 9 sub-apps. Each sub-app has its own logic, that is needed to understand when working with react.
I've used multiple react and JS features. Storing data locally within my `blog` app, `async await` sugar syntax being used on `chucknorris API` when fetching data from the server, `useEffect` hook is playing a big role in `memory app` when finding matched pairs depending on the state as well. Not only the react state, but I used `redux` to re-create my single counter app to `redux-counter`. I'm also excited to introduce you my custom logic for `tic-tac-toe` game, named as `tik-tok` in my project just to be a bit more funny. :) I would be sad if I didn't mention my `todo app` which is absoulute madness. It contains all neccessary features as filter by 'active', 'completed', and 'to-do'. You can edit your tasks by double-clicking on each of the input field.

## Homepage
Simple informative page about JS history and its uses.

## Counter
Simple web app that increments or decrements numbers based on plus and minus buttons.

## Todo-app
This is my favorite app where you can add todos, `edit`, `delete` and mark them as `completed`

## Hacker-typer
Shows a terminal where you become a hacker.

## Redux-Counter
Recreated initial counter-app by using the global state storage via Redux library with more Mathematical operations being added.

## Memory game
Cool animation app where you need to guess the matching pairs and win the game :)

## Tik Tok game
Tik Tok or tic-tac-toe... name it as you want :D App being used as an example on React documentation page, however this is a new level, with custom logic 8)

## Chuck Norris
Trying to work with some funny api to have more fun. App waits till all jokes get fetched. Client is able to fetch jokes from particular category too. While jokes being generated custom loading gif is being displayed on a client-side with potential errors being thrown as well.

## Blog
Have you ever heard about articles where you can input `markdown`? This app accepts markdown and renders it directly to every article where its being used on. Additionaly I use `router` here as well to go to specific article depending on url slug.

## Available scripts

> In the project directory, you can run:

### `npm run`

+ Runs the app in the development mode.\

### `npm test`

+ Launches the test runner in the interactive watch mode.\

### `npm build`

+ Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

### `npm eject`

+ This command will remove the single build dependency from your project.
