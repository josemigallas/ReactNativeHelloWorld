/**
* React-Native Android Jenkinsfile
*/

import groovy.json.JsonSlurper

// Params
def buildConfig = params.BUILD_CONFIG.toLowerCase()
def codeSighProfileId = params.BUILD_CREDENTIAL_ID

// Constanst
def packageJson = new JsonSlurper().parse(new File('.//package.json'))
def projectName = packageJson.name

def infoPlist = "${projectName}/Info.plist"
def outputFileName = "${projectName}-${buildConfig}.ipa".replace(" ", "").toLowerCase()
def sdk = "iphoneos"

println("projectName: ${projectName}, info.plist: ${infoPlist}, outputFileName: ${outputFileName}")

node("android") {

  stage("Checkout") {
    checkout scm
  }

  stage ("Prepare") {
    sh 'npm install --production'
  }

  stage("Build") {
    sh 'chmod +x ./android/gradlew'
    sh "cd android && ./gradlew clean assemble${buildConfig}"
  }

  stage("Sign") {
    if (buildConfig == 'release') {
        signAndroidApks (
            keyStoreId: "${params.BUILD_CREDENTIAL_ID}",
            keyAlias: "${params.BUILD_CREDENTIAL_ALIAS}",
            apksToSign: "**/*-unsigned.apk",
        )
    } else {
      println('Debug Build - Using default developer signing key')
    }
  }

  stage("Archive") {
    archiveArtifacts artifacts: "android/app/build/outputs/apk/app-${buildConfig}.apk", excludes: 'android/app/build/outputs/apk/*-unaligned.apk'
  }
}

node("ios") {

  stage("Checkout") {
    checkout scm
  }

  stage("Prepare") {
    sh "npm install --production"
  }

  stage("Build") {
    sh "react-native run-ios --configuration Release"
  }

  stage("Sign") {

  }

  stage("Archive") {
    archiveArtifacts artifacts: "platforms/ios/build/${buildconfig}-${sdk}/${outputFileName}"
  }

}
