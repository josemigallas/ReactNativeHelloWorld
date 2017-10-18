/**
* React-Native Android Jenkinsfile
*/

import groovy.json.JsonSlurper

def buildConfig = params.BUILD_CONFIG.toLowerCase()

// node("android") {

//   stage("Checkout") {
//     checkout scm
//   }

//   stage ("Prepare") {
//     sh 'npm install --production'
//   }

//   stage("Build") {
//     sh 'chmod +x ./android/gradlew'
//     sh "cd android && ./gradlew clean assemble${buildConfig}"
//   }

//   stage("Sign") {
//     if (buildConfig == 'release') {
//         signAndroidApks (
//             keyStoreId: "${params.BUILD_CREDENTIAL_ID}",
//             keyAlias: "${params.BUILD_CREDENTIAL_ALIAS}",
//             apksToSign: "**/*-unsigned.apk",
//         )
//     } else {
//       println('Debug Build - Using default developer signing key')
//     }
//   }

//   stage("Archive") {
//     archiveArtifacts artifacts: "android/app/build/outputs/apk/app-${buildConfig}.apk", excludes: 'android/app/build/outputs/apk/*-unaligned.apk'
//   }
// }

node("ios") {

  def projectName = "ReactNativeHelloWorld"
  // def infoPlist
  def outputFileName = "${projectName}-${buildConfig}.ipa".replace(" ", "").toLowerCase()
  def sdk = "iphoneos"
  def bundleId = "org.feedhenry.rnhelloworld"
  def version = "0.0.0"
  def shortVersion = "0.0"
  def credentialBundleId = "25043336-45ff-4dc8-be1f-063bd8d1a5f9"

  stage("Checkout") {
    checkout scm
  }

  stage("Prepare") {
    // def matcher = readFile('package.json') =~ '"name": ?"(.+)"'
    // projectName = matcher[0][1]
    // infoPlist = "ios/${projectName}/Info.plist"
    // outputFileName = "${projectName}-${buildConfig}.ipa".replace(" ", "").toLowerCase()
    sh "rm -rf node_modules && npm cache clean"
    // sh "npm install babel-preset-react-native@2.1.0 --save-dev"
    sh "npm install"
    // sh "mkdir -p platforms/ios"
  }

  stage("Build") {
    /*xcodeBuild(
      cleanBeforeBuild: true,
      src: "./platforms/ios",
      schema: "${projectName}",
      workspace: "${projectName}",
      buildDir: "build",
      sdk: "${sdk}",
      version: "${version}",
      shortVersion: "${shortVersion}",
      bundleId: "${bundleId}",
      infoPlistPath: "${infoPlist}",
      xcodeBuildArgs: 'ENABLE_BITCODE=NO OTHER_CFLAGS="-fstack-protector -fstack-protector-all"',
      autoSign: false,
      config: "${buildConfig == 'debug' ? 'Debug' : 'Release'}"
    )*/
    sh "react-native run-ios --configuration Release"
  }

  /*stage("Sign") {
    codeSign(
      profileId: "${credentialBundleId}",
      clean: true,
      verify: true,
      ipaName: outputFileName,
      // appPath: "platforms/ios/build/${buildConfig}-${sdk}/${projectName}.app"
      appPath: "/Users/jenkins/workspace/react-native-pipeline/ios/build/Build/Products/Release-iphonesimulator/ReactNativeHelloWorld.app"
    )
  }*/

  stage("Archive") {
    // archiveArtifacts artifacts: "platforms/ios/build/${buildconfig}-${sdk}/${outputFileName}"
    archiveArtifacts artifacts: "/Users/jenkins/workspace/react-native-pipeline/ios/build/Build/**.app"
  }

}
