const { execFileSync, execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// eslint-disable-next-line no-undef
const root = path.resolve(path.join(__dirname, '..'));
const env = path.resolve(root, '.env.local');
const key = path.resolve(root, 'my-upload-key.keystore');

if (!fs.existsSync('./android')) {
  if (!fs.existsSync(env)) {
    throw new Error('Missing .env.local file in project root.\nSee readme for more information.');
  }
  if (!fs.existsSync(key)) {
    throw new Error('Missing keystore file. Please add it to the root of the project.');
  }

  // Export android project
  execSync('npm run android:export');

  // Apply patches
  execFileSync('git', [
    'apply',
    path.resolve(root, 'patches', 'build-gradle.patch'),
  ]);

  // Add properties
  const content = fs.readFileSync(env, { encoding: 'utf-8' });
  const androidProperties = path.resolve(root, 'android', 'gradle.properties');
  fs.appendFileSync(androidProperties, `\n\n${content}`);

  // Copy keystore file
  fs.copyFileSync(key, path.resolve(root, 'android', 'app', 'my-upload-key.keystore'));
}
