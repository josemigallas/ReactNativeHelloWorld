/**
* React-Native Android Jenkinsfile
*/
node("android") {

  stage("Checkout") {
    checkout scm
  }

  stage ("Prepare") {
    // writeFile file: 'app/src/main/assets/fhconfig.properties', text: params.FH_CONFIG_CONTENT
  }

  stage("Build") {
    sh 'chmod +x ./android/gradlew'
    if (params.BUILD_CONFIG == 'release') {
      sh './android/gradlew clean assembleRelease'
    } else {
      sh './android/gradlew clean assembleDebug'
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
        archiveArtifacts artifacts: 'app/build/outputs/apk/app-release.apk', excludes: 'app/build/outputs/apk/*-unaligned.apk'
    } else {
        archiveArtifacts artifacts: 'app/build/outputs/apk/app-debug.apk', excludes: 'app/build/outputs/apk/*-unaligned.apk'
    }
  }
}