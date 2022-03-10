# Toy Robot

## Running

To run the Toy Robot CLI app run:

```
yarn toy-robot
```

This will boot the app with prompts

To run linter:

```
yarn lint
```

And finally tests using Jest:

```
yarn test
```

See commands.txt for examples of appliation execution

## Development Process

I have tried to focus on input sanitisation early to prevent this from being a longer term consideration

I have kept dependancies to a minimum as this is my preference

I have used TDD to help with my development flow

## Improvements

- I would like to move most of the logic around the input command from the `ToyRobot` class to the `Command` class
- An exit command could be added to help with use
- A configurable board size could be defined when booting the command
