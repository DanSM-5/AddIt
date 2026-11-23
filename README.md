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
- Java 21 (open-jdk/oracle-jdk) (`scoop install openjdk21`)
- Android SDK Platform 36 and Build Tools 36.0.0 (`scoop install android-sdk`)
  - Expo SDK 57 / React Native 0.86 builds with `compileSdk` 36, `targetSdk` 36 and `minSdk` 24.
- Gradle 9.3.1. Gradle does **not** need to be installed: it is downloaded by the Gradle wrapper (`gradlew`) that `npm run android:prepare` generates. Always use the wrapper, not a globally installed `gradle`.

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
.\gradlew.bat assembleRelease
```

#### Clean Gradle build

Gradle keeps its caches and daemons in a home directory (`~/.gradle`, or `GRADLE_USER_HOME` if set) that is
shared with every other Gradle project on the machine. If another project used a different Gradle version or
setup, the build can fail with errors that have nothing to do with this project, for example:

```
node_modules/@react-native/gradle-plugin/settings.gradle.kts: Unresolved reference 'plugins'.
```

To get a clean build, stop the running daemons, clean the project and build with a Gradle home that is only used by this project:

```bash
# bash/zsh
cd android
./gradlew --stop
export GRADLE_USER_HOME="$HOME/.gradle-addit"
./gradlew clean
./gradlew app:bundleRelease   # or assembleRelease for an apk
```

```powershell
# powershell
cd android
.\gradlew.bat --stop
$env:GRADLE_USER_HOME = "$HOME\.gradle-addit"
.\gradlew.bat clean
.\gradlew.bat app:bundleRelease   # or assembleRelease for an apk
```

The first build with a new Gradle home takes longer because it downloads Gradle 9.3.1 and the dependencies again.

> [!WARNING]
> On Windows keep `GRADLE_USER_HOME` short (such as `$HOME\.gradle-addit`). The native (CMake/ninja) build uses
> paths deep inside the Gradle home and fails with `Filename longer than 260 characters` if it is too long.

If the build still fails, regenerate the native project from scratch (the `android` folder is generated and ignored by git):

```bash
rm -rf android   # powershell: Remove-Item -Recurse -Force android
npm run android:prepare
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

## Testing and checks

```bash
npm test              # run unit tests once (Vitest)
npm run test:watch    # re-run tests on change
npm run lint:types    # type-check with TypeScript 7 (native compiler)
npm run lint          # ESLint
```

Tests run with [Vitest](https://vitest.dev) in two projects (Vite is only used
by the test runner; the app is still bundled by Metro):

- `unit` — `*.test.ts`, plain TypeScript logic in Node.
- `native` — `*.test.tsx`, React Native components rendered with
  [React Native Testing Library](https://callstack.github.io/react-native-testing-library/)
  through [vitest-native](https://vitest-native.danfry.dev/), on React Native's
  real JavaScript with native modules mocked. Setup lives in
  `test/setup-native.ts`.

Run a single project with `npx vitest run --project native`.

> [!IMPORTANT]
> vitest-native needs Node 22.22.3+ (or 24.12+). Use the version in `.nvmrc`
> (`nvm use`).

> [!NOTE]
> Reanimated's test mock finishes animations immediately, so tests check that
> an animation starts (e.g. by spying on `withRepeat`) rather than its
> intermediate frames. Animated colours are reported as `rgba(r, g, b, 1)`.

> [!NOTE]
> TypeScript 7 is installed under the `typescript-7` alias and used only for
> type-checking. `typescript` stays on 6.x because ESLint (`typescript-eslint`)
> and other tooling still need its JavaScript API.
> `npm run lint:types:legacy` type-checks with TypeScript 6.

## Setup Environment

### Windows

You can install the dependencies in windows using `scoop` package manager.
Set environment variables dependencies as follows:

```bash
# bash/zsh
export ANDROID_HOME="$HOME/scoop/apps/android-sdk/current"
export PATH="$ANDROID_HOME/tools:$ANDROID_HOME/tools/bin:$ANDROID_HOME:/platform-tools:$PATH"
export JAVA_HOME="$HOME/scoop/apps/openjdk21/current"
```

```powershell
# powershell
$env:ANDROID_HOME = "$HOME/scoop/apps/android-sdk/current"
$env:PATH = "$env:ANDROID_HOME/tools:$env:ANDROID_HOME/tools/bin:$env:ANDROID_HOME:/platform-tools:$env:PATH"
$env:JAVA_HOME = "$HOME/scoop/apps/openjdk21/current"
```

## Download the game

You can get the current version of the game from the [Play Store](https://play.google.com/store/apps/details?id=com.eduardosanchez.addit)
