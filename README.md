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

- Node 22.15.0 (provided `.nvmrc` file)
- Java 17 (open-jdk/oracle-jdk) (`scoop install openjdk17`)
- Android Build tools (adb) (`scoop install android-sdk`)

## How to build (Android)

1. Clone the repository.
```bash
git clone https://github.com/DanSM-5/AddIt
```
2. Run `npm ci` to install the dependencies.

3. Create a `.env.local` file in the root of the project:

```bash
MYAPP_UPLOAD_STORE_FILE=my-upload-key.keystore
MYAPP_UPLOAD_KEY_ALIAS=my-key-alias
MYAPP_UPLOAD_STORE_PASSWORD=***
MYAPP_UPLOAD_KEY_PASSWORD=***
```

4. Add `<my-upload-key.keystore>` to the root of the project.

5. Run the command

```bash
npm run android:prepare
```

The command will setup the required files for the android build process.

### Development

1. Run the command

```bash
npm android
```

### Production

#### Build using gradlew (apk)

Execute the following commands to build

```bash
cd android
./gradlew assembleRelease
```

or in windows

```powershell
cd android
gradle assembleRelease
```

#### Build using react-native cli (aab)

```bash
npm run android:aab
```

#### Build using expo cli (apk)

```bash
npm run android:apk
```

> [!NOTE]
> Using expo cli requires to have a real device or emulator connected through adb.

## Setup Environment

### Windows

You can install the dependencies in windows using `scoop` package manager.
Set environment variables dependencies as follows:

```bash
# bash/zsh
export ANDROID_HOME="$HOME/scoop/apps/android-sdk/current"
export PATH="$ANDROID_HOME/tools:$ANDROID_HOME/tools/bin:$ANDROID_HOME:/platform-tools:$PATH"
export JAVA_HOME="$HOME/scoop/apps/openjdk17/current"
```

```powershell
# powershell
$env:ANDROID_HOME = "$HOME/scoop/apps/android-sdk/current"
$env:PATH = "$env:ANDROID_HOME/tools:$env:ANDROID_HOME/tools/bin:$env:ANDROID_HOME:/platform-tools:$env:PATH"
$env:JAVA_HOME = "$HOME/scoop/apps/openjdk17/current"
```

## Download the game

You can get the current version of the game from the [Play Store](https://play.google.com/store/apps/details?id=com.eduardosanchez.addit)
