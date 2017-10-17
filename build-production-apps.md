# Build production apps

## IOS
https://facebook.github.io/react-native/docs/running-on-device.html#building-your-app-for-production

1. Enable ATS

    Remove entry "localhost" from NSExceptionDomains in Info.plist.

2. Configure release scheme

    go to Product → Scheme → Edit Scheme. Select the Run tab in the sidebar, then set the Build Configuration dropdown to Release.

3. Build app for release

    Run `react-native run-ios --configuration Release` or build with XCode.


## IOS with XCode Command Line tools
https://developer.apple.com/library/content/technotes/tn2339/_index.html

1. List all targets, build configurations and schemes 

    Run `xcodebuild -list -project ios/ReactNativeHelloWorld.xcodeproj/`

2. 

## Android
https://facebook.github.io/react-native/docs/running-on-device.html#building-your-app-for-production

https://facebook.github.io/react-native/docs/signed-apk-android.html

1. Generate a signing key using keytool

    Run `keytool -genkey -v -keystore my-release-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000`

2. Add signing config to your app's build.gradle

    signingConfigs {
        release {
            storeFile file("my-release-key.keystore")
            storePassword *****
            keyAlias my-key-alias
            keyPassword *****
        }
    }

    Note: you can use gradle.properties to hide sensitive data.

3. Generate release APK

    Run `cd android && ./gradlew assembleRelease`