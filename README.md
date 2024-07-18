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
- Android Build tools (Target API 33 for expo and target API 34 for release)

## How to build (Android)

1. Clone the repository.
```bash
git clone https://github.com/DanSM-5/AddIt
```
2. Run `npm ci` to install the dependencies.

### Development

1. Run the command

```bash
npm start
```

2. When expo launches, type `a` for building for Android.

### Production

1. Create a `local.properties` file in `./android` with the following variables:

```bash
CERTIFICATE=<CERTIFICATE.keystore>
KEY_ALIAS=<ALIAS>
STORE_PASSWORD=<STORE_PASSWORD>
KEY_PASSWORD=<KEY_PASSWORD>
```

2. Locate the `<CERTIFICATE.keystore>` under `./android` and `./android/app`.

3. Build a release app using `gradlew`

```bash
cd android
./gradle assembleRelease
```

or in windows

```powershell
cd android
gradle assembleRelease
```

## Setup Environment

### Windows

You can install the dependencies in windows using `scoop` package manager.
Set environment variables dependencies as follows:

```bash
# bash/zsh
export ANDROID_HOME="$HOME/scoop/apps/android-sdk/current"
export PATH="$ANDROID_HOME/tools:$ANDROID_HOME/tools/bin:$ANDROID_HOME:/platform-tools:$PATH"
export JAVA_HOME="$HOME/scoop/apps/openjdk11/current"
```

```powershell
# powershell
$env:ANDROID_HOME = "$HOME/scoop/apps/android-sdk/current"
$env:PATH = "$env:ANDROID_HOME/tools:$env:ANDROID_HOME/tools/bin:$env:ANDROID_HOME:/platform-tools:$env:PATH"
$env:JAVA_HOME = "$HOME/scoop/apps/openjdk11/current"
```

## Download the game

You can get the current version of the game from the [Play Store](https://play.google.com/store/apps/details?id=com.eduardosanchez.addit)
