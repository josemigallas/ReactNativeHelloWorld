/**
* React-Native Android Jenkinsfile
*/
node("android") {

  stage("Checkout") {
    checkout scm
  }

  stage ("Prepare") {
    sh 'curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.32.0/install.sh | bash && nvm install 6 && nvm use 6'
    sh 'node --version'
    // Hola ssh
    sh 'npm install'
    if (!fileExists('android/app/src/main/assets')) {
      sh 'mkdir android/app/src/main/assets'
    }
    sh 'node_modules/.bin/react-native bundle --platform android --dev false --entry-file index.android.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res'
  }

  stage("Build") {
    sh 'chmod +x ./android/gradlew'
    if (params.BUILD_CONFIG == 'release') {
      sh 'cd android && ./gradlew clean assembleRelease'
    } else {
      sh 'cd android && ./gradlew clean assembleDebug'
    }
  }

  stage("Sign") {
    if (params.BUILD_CONFIG == 'release') {
        signAndroidApks (
            keyStoreId: "${params.BUILD_CREDENTIAL_ID}",
            keyAlias: "${params.BUILD_CREDENTIAL_ALIAS}",
            apksToSign: "**/*-unsigned.apk",
            // uncomment the following line to output the signed APK to a separate directory as described above
            // signedApkMapping: [ $class: UnsignedApkBuilderDirMapping ],
            // uncomment the following line to output the signed APK as a sibling of the unsigned APK, as described above, or just omit signedApkMapping
            // you can override these within the script if necessary
            // androidHome: '/usr/local/Cellar/android-sdk'
        )
    } else {
      println('Debug Build - Using default developer signing key')
    }
  }

 stage("Archive") {
    if (params.BUILD_CONFIG == 'release') {
        archiveArtifacts artifacts: 'android/app/build/outputs/apk/app-release.apk', excludes: 'android/app/build/outputs/apk/*-unaligned.apk'
    } else {
        archiveArtifacts artifacts: 'android/app/build/outputs/apk/app-debug.apk', excludes: 'android/app/build/outputs/apk/*-unaligned.apk'
    }
  }
}
