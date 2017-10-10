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

  def projectName
  def infoPlist
  def outputFileName
  def sdk = "iphoneos"
  def bundleId = "org.feedhenry.rnhelloworld"
  def version = "0.0.0"
  def shortVersion = "0.0"

  stage("Checkout") {
    checkout scm
  }

  stage("Prepare") {
    def matcher = readFile('package.json') =~ '"name": ?"(.+)"'
    projectName = matcher[0][1]
    infoPlist = "${projectName}/Info.plist"
    outputFileName = "${projectName}-${buildConfig}.ipa".replace(" ", "").toLowerCase()
    
    sh "npm install --production"
  }

  stage("Build") {
    xcodeBuild(
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
    )
  }

  stage("Sign") {
    codeSign(
      profileId: "${params.BUILD_CREDENTIAL_ALIAS}",
      clean: true,
      verify: true,
      ipaName: outputFileName,
      appPath: "platforms/ios/build/${buildConfig}-${sdk}/${projectName}.app"
    )
  }

  stage("Archive") {
    archiveArtifacts artifacts: "platforms/ios/build/${buildconfig}-${sdk}/${outputFileName}"
  }

}
