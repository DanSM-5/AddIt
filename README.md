Add It!
==========

Add it! is a simple math game where you need to find the set of numbers that sums to the target number displayed at the top of the screen but do it quickly as there is a time limit.

The project is powered by React Native. Currently only tested in Android.

## Features

- 3 Pre-set dificulties for a quick game.
- Custom game mode to personalice your own experience and progress at your own rithm.
- Supports English and Spanish.

## Motivation

The game "Add It!" was created as a personal project to familiarize with the React Native framework. Some features were built with the only purpose of learning. If you have any suggestion, feel free to open an issue.

## Dependencies

To build for Android you need the following:

- Node 18.6.0
- Java 11 (open-jdk/microsoft open-jdk/oracle-jdk)
- Android command-line tools or Android Studio.
- Android Build tools (Target API 33)

## How to build (Android)

1. Clone the repository.
```bash
git clone https://github.com/DanSM-5/AddIt
```
2. Run `npm ci` to install the dependencies.
3. Run:

```bash
cd android
./gradle assembleRelease
```

For development run `npm start` in the root of the project.

## Download the game

You can get the current version of the game from the [Play Store](https://play.google.com/store/apps/details?id=com.eduardosanchez.addit)
