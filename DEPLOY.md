# Deployment Guide

This guide covers building and deploying APSIS to the web and Google Play Store.

## Prerequisites

- **Node.js 18+** or **Bun** for package management
- **npm**, **pnpm**, or **yarn** (comes with Node.js)
- Git
- For Play Store: **Android Studio**, **Java Development Kit (JDK) 11+**, and a **Google Play Console account**

---

## Web Deployment

### 1. Install Dependencies

```bash
npm install
# or
bun install
```

### 2. Build for Production

```bash
npm run build
```

This generates static assets in the `dist/` directory.

### 3. Preview Locally (Optional)

```bash
npm run preview
```

Open your browser to `http://localhost:4173` to test the production build.

### 4. Deploy Static Build

Choose your hosting platform:

#### Option A: Vercel (Recommended for React)

1. Connect your repo on [vercel.com](https://vercel.com)
2. Select the `deploy-guides` branch
3. Set **Build Command**: `npm run build`
4. Set **Output Directory**: `dist`
5. Deploy

#### Option B: Netlify

1. Connect your repo on [netlify.com](https://netlify.com)
2. Set **Build Command**: `npm run build`
3. Set **Publish Directory**: `dist`
4. Deploy

#### Option C: AWS S3 + CloudFront

1. Build locally: `npm run build`
2. Upload `dist/` folder to S3 bucket
3. Create CloudFront distribution pointing to S3
4. Set **Origin Path** to `/`
5. Add **Error Pages** rule: `/index.html` (404 → 200) for SPA routing

#### Option D: Docker

1. Build image:
   ```bash
   docker build -t apsis-web:latest .
   ```

2. Run container:
   ```bash
   docker run -d -p 8080:80 --name apsis-web apsis-web:latest
   ```

3. Push to registry (Docker Hub, ECR, etc.) and deploy to your orchestration platform (Kubernetes, Docker Swarm, ECS)

#### Option E: Self-Hosted Nginx

1. Build: `npm run build`
2. Copy `dist/` to `/var/www/apsis`
3. Use nginx config from [deploy/nginx/dev.apsis.best.conf](deploy/nginx/dev.apsis.best.conf) as reference
4. Ensure SPA fallback: `error_page 404 =200 /index.html;`

---

## Android / Google Play Store Deployment

### 1. Set Up Capacitor

Install Capacitor and required packages:

```bash
npm install @capacitor/core @capacitor/cli @capacitor/android
```

### 2. Initialize Capacitor (First Time Only)

```bash
npx cap init apsis com.example.apsis --web-dir=dist
```

Replace `com.example.apsis` with your actual app ID (reverse domain format).

### 3. Build Web Assets

```bash
npm run build
```

### 4. Add Android Platform

```bash
npx cap add android
```

### 5. Sync Web Assets to Android Project

```bash
npx cap sync android
```

### 6. Open Android Studio

```bash
npx cap open android
```

### 7. Configure Android App (In Android Studio)

1. **App Name**: Update in `android/app/src/main/AndroidManifest.xml` → `<application android:label="@string/app_name">`
2. **App ID**: Already set during `npx cap init`, but verify in `build.gradle.kts` (`:app` module) under `android { namespace = "com.example.apsis" }`
3. **Version Code & Name**: In `android/app/build.gradle.kts`
   ```kotlin
   android {
       ...
       defaultConfig {
           ...
           versionCode = 1          // Increment for each release
           versionName = "1.0.0"    // User-facing version
       }
   }
   ```
4. **App Icons & Splash Screen**: Place in `android/app/src/main/res/`
5. **Permissions**: Edit `android/app/src/main/AndroidManifest.xml` if needed (e.g., camera, location)

### 8. Set Up Release Signing

Create or use an existing keystore:

```bash
keytool -genkey -v -keystore apsis-release-key.jks -keyalg RSA -keysize 2048 -validity 10000 -alias apsis-key
```

In `android/app/build.gradle.kts`, add signing config:

```kotlin
signingConfigs {
    create("release") {
        keyStore = file("../apsis-release-key.jks")
        keyStorePassword = "your_password"
        keyAlias = "apsis-key"
        keyPassword = "your_password"
    }
}

buildTypes {
    release {
        signingConfig = signingConfigs.getByName("release")
    }
}
```

**⚠️ Store the keystore file safely**. You'll need it for all future updates.

### 9. Build Release Bundle

```bash
cd android
./gradlew bundleRelease
```

Output: `android/app/build/outputs/bundle/release/app-release.aab`

### 10. Upload to Google Play Console

1. Go to [play.google.com/console](https://play.google.com/console)
2. Create or select your app
3. Navigate to **Release** → **Production**
4. Click **Create new release**
5. Upload the `.aab` file
6. Fill in **Release notes**
7. Add **Store listing** (description, screenshots, privacy policy)
8. Complete **App content questionnaire** and **content rating**
9. Review and **Roll out to Production**

---

## Development Build for Android (Testing)

### Option A: Debug APK (Direct to Device)

```bash
cd android
./gradlew assembleDebug
```

Output: `android/app/build/outputs/apk/debug/app-debug.apk`

Install via ADB:
```bash
adb install android/app/build/outputs/apk/debug/app-debug.apk
```

### Option B: Android Studio

1. Open Android Studio (from `npx cap open android`)
2. Select a device or emulator
3. Click **Run** (green play button)

---

## Continuous Integration / Deployment (Optional)

Add a GitHub Actions workflow (`.github/workflows/deploy.yml`):

```yaml
name: Deploy

on:
  push:
    branches: [main, deploy-guides]

jobs:
  build-web:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm install
      - run: npm run build
      - name: Deploy to Vercel
        env:
          VERCEL_TOKEN: ${{ secrets.VERCEL_TOKEN }}
        run: vercel --prod

  build-android:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-java@v3
        with:
          java-version: 11
          distribution: temurin
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm install
      - run: npm run build
      - run: npx cap sync android
      - run: cd android && ./gradlew bundleRelease
      - name: Upload to Play Console
        uses: r0adkll/upload-google-play@v1
        with:
          serviceAccountJsonPlainText: ${{ secrets.PLAY_STORE_SA_JSON }}
          packageName: com.example.apsis
          releaseFiles: android/app/build/outputs/bundle/release/app-release.aab
          track: internal
```

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Build fails: "Node modules missing" | Run `npm install` or `bun install` |
| Capacitor sync fails | Delete `android/` and run `npx cap add android` again |
| Gradle build error | Update Android Studio, ensure JDK 11+, run `./gradlew clean` |
| App crashes on Android | Check `Logcat` in Android Studio for errors |
| Play Store upload rejected | Verify versionCode incremented, signing certificate valid, manifest permissions correct |
| SPA routes not working on web | Ensure hosting platform redirects 404s to `index.html` |

---

## Quick Reference

```bash
# Web development
npm run dev

# Web production build
npm run build

# Web preview
npm run preview

# Android setup
npx cap init apsis com.example.apsis --web-dir=dist
npx cap add android
npx cap sync android
npx cap open android

# Android release build
cd android && ./gradlew bundleRelease

# Android debug build & test
cd android && ./gradlew assembleDebug
adb install android/app/build/outputs/apk/debug/app-debug.apk
```

---

## Links & Resources

- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://react.dev/)
- [Capacitor Documentation](https://capacitorjs.com/)
- [Google Play Console](https://play.google.com/console)
- [Android Studio Setup](https://developer.android.com/studio)
