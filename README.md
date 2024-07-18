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
- Android Build tools (Target API 34)

## How to build (Android)

1. Clone the repository.
```bash
git clone https://github.com/DanSM-5/AddIt
```
2. Run `npm ci --legacy-peer-deps` to install the dependencies. Flag is needed due to issue with `react-native-numeric-input`.
3. Go to **node_modules/react-native-numeric-input/NumericInput/NumericInput.js** and change property `name` from Icon to `chevron-back-circle` and `chevron-forward-circle`.
```tsx
  <Icon name='chevron-back-circle' />
  ...
  <Icon name='chevron-forward-circle' />
```

### Development

Run the command

```bash
npm start
```

When expo launches, type `a` for building for Android.

### Production

Build a release app using `gradlew`

```bash
cd android
./gradle assembleRelease
```

or in windows

```powershell
cd android
gradle assembleRelease
```

You can also try the npm command `npm run build:release:android`

## Setup Environment

### Windows

You can install the dependencies in windows using `scoop` package manager.
Set environment variables dependencies as follows:

```bash
export ANDROID_HOME="$HOME/scoop/apps/android-sdk/current"
export PATH="$ANDROID_HOME/tools:$ANDROID_HOME/tools/bin:$ANDROID_HOME:/platform-tools:$PATH"
export JAVA_HOME="$HOME/scoop/apps/openjdk11/current"
```

## Download the game

You can get the current version of the game from the [Play Store](https://play.google.com/store/apps/details?id=com.eduardosanchez.addit)
