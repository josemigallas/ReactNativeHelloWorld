/**
* React-Native Android Jenkinsfile
*/
def buildConfig = params.BUILD_CONFIG.toLowerCase()

node("android") {

  stage("Checkout") {
    checkout scm
  }

  stage ("Prepare") {
    sh 'npm install --production'
  }

  stage("Build") {
    sh 'chmod +x ./android/gradlew'
    if (buildConfig == 'release') {
      sh 'cd android && ./gradlew clean assembleRelease'
    } else {
      sh 'cd android && ./gradlew clean assembleDebug'
    }
  }

  stage("Sign") {
    if (buildConfig == 'release') {
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
    archiveArtifacts artifacts: "android/app/build/outputs/apk/app-${buildConfig}.apk", excludes: 'android/app/build/outputs/apk/*-unaligned.apk'
  }
}
