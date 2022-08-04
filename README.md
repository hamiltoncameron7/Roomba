# Roomba

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.3.7.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

# The Code

This app is designed to visualize the movement of a robot vacuum (Roomba), and the algorithm it uses to move and avoid obstacles

## Moving Roomba

This is where the vacuum itself is stored, along with all of it's functions

### movingroomba.component.ts

This is where the Javascript for the vacuum is stored. Everything is commented, but basic breakdowns for the major functions are in the sections below

#### startRoomba()

This function begins the movement of the vacuum, from the starting position (0, 0) to the position input by the user

Eventually, this will change from taking user input to taking input from an algorithm that tells the vacuum which direction to go next

#### loopDeLoop()

This function is a self iterating loop. I used this instead of a for loop because of the timeout and issues with asynchronus functions

This is where the CSS update statements are updated and pushed to the page
