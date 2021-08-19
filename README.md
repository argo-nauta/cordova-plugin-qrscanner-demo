# cordova-plugin-qrscanner-demo
This is the an example project for [cordova-plugin-qrscanner plugin](https://github.com/bitpay/cordova-plugin-qrscanner)

# How to run
1. Buil
```
cordova build android
```

2. Run on device
```
cordova run android
```

# Important
Make body and app background transparent show www/css/index.css
I made some changes in index.css to show the scanner video.

# iOS
There is some problem in the library and it does not compile, you need to run this command from terminal to replace
UIApplication.openSettingsURLString with UIApplicationOpenSettingsURLString 
or open Xcode and change directly in cordova-plugin-qrscanner-demo/platforms/ios/QRScannerDemo/Plugins/cordova-plugin-qrscanner
```
find . -type f -name "*.swift" -print0 | xargs -0 sed -i '' -e 's/UIApplication.openSettingsURLString/UIApplicationOpenSettingsURLString/g
```