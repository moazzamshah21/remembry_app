# 16 KB Page Size Support - Complete Configuration

## ⚠️ CRITICAL REQUIREMENT: React Native 0.77+ is Required

**React Native 0.76 and earlier versions do NOT natively support 16KB page sizes.** Official support was introduced in React Native 0.77. Apps built with version 0.76 or lower that contain native code will likely crash on devices with 16KB pages (such as newer Android 15+ devices).

### Key Requirements:
- ✅ **React Native 0.77+** - **MANDATORY** - React Native 0.76 does NOT support 16KB pages natively
- ✅ **Android Gradle Plugin (AGP) 8.5.1+** - Required for proper alignment (AGP 8.7.1 is used in this project)
- ✅ **NDK r28+** - Recommended for best compatibility (NDK r28+ compiles with 16KB alignment by default)
- ✅ **Android 15+** - Devices with 16KB pages (Google requires compatibility by November 1, 2025)
- ⚠️ **Third-Party Libraries** - All libraries with native code must also support 16KB alignment

## ✅ Configuration Applied

### 1. Gradle Properties (`android/gradle.properties`)
- ✅ Added `android.enable16kPages=true` - **CRITICAL** property that tells AGP to ensure 16 KB alignment

### 2. Android Build Configuration (`android/app/build.gradle`)
- ✅ AGP 8.7.1 (supports 16 KB alignment, meets 8.5.1+ requirement)
- ✅ `extractNativeLibs="false"` in AndroidManifest.xml
- ✅ `useLegacyPackaging = false` in packaging configuration
- ✅ Target SDK 35 (Android 15)
- ⚠️ NDK r26.1.10909125 (compatible with react-native-reanimated, but NDK r28+ is recommended for best 16KB compatibility)

### 3. AndroidManifest.xml
- ✅ `android:extractNativeLibs="false"` is set in the `<application>` tag

## 🔍 What This Configuration Does

1. **`android.enable16kPages=true`**: This is the key property that tells Android Gradle Plugin to:
   - Ensure all native libraries are aligned to 16 KB boundaries
   - Handle zip alignment automatically
   - Work with AGP 8.7.1 to ensure proper ELF segment alignment

2. **AGP 8.7.1**: Automatically handles 16 KB zip alignment for uncompressed native libraries when `extractNativeLibs="false"` is set.

3. **NDK r26**: While NDK r28+ compiles with 16 KB alignment by default, NDK r26 works with AGP 8.7.1 and the `android.enable16kPages=true` property to achieve 16 KB alignment.

## ⚠️ Potential Issues

### Prebuilt Libraries
Some third-party libraries ship with precompiled `.so` files that may not be 16 KB aligned:
- `@stripe/stripe-react-native@0.57.2` - Check if this version supports 16 KB
- `@react-native-firebase/*` - Version 23.4.1 should support 16 KB, but verify
- `react-native-reanimated@3.16.0` - Should be built with 16 KB alignment when using this configuration
- Other native modules

### Solution for Prebuilt Libraries
If Google Play still rejects the app after this configuration:

1. **Check Google Play Console's App Bundle Explorer**:
   - Upload your AAB to Play Console
   - Use "App Bundle Explorer" to see which specific libraries are flagged
   - Look for warnings about 16 KB alignment

2. **Update Dependencies**:
   - Update all native dependencies to their latest versions
   - Check each library's GitHub/release notes for 16 KB support

3. **Verify Library Versions Support 16 KB**:
   ```bash
   # Check if libraries have 16 KB support
   npm outdated
   # Update to latest versions that support 16 KB
   ```

## 📋 Next Steps

1. **Clean and Rebuild**:
   ```bash
   cd android
   ./gradlew clean
   ./gradlew bundleRelease
   ```

2. **Verify Bundle Alignment**:
   ```bash
   bundletool dump config --bundle=app/build/outputs/bundle/release/app-release.aab | grep alignment
   # Should show: "alignment": "PAGE_ALIGNMENT_16K"
   ```

3. **Test the Build**:
   - Build should complete successfully
   - Upload to Google Play Console
   - Check App Bundle Explorer for any 16 KB warnings

4. **If Still Rejected**:
   - Use Google Play Console's App Bundle Explorer to identify specific libraries
   - Update those libraries to versions that support 16 KB
   - Or contact library maintainers for 16 KB-compatible versions

## 🔧 Verification Commands

```bash
# Check bundle alignment
bundletool dump config --bundle=android/app/build/outputs/bundle/release/app-release.aab | grep alignment

# Extract and check individual .so files (if needed)
unzip app.apk -d extracted/
readelf -l extracted/lib/arm64-v8a/libyourlibrary.so | grep LOAD
# Look for 'Align' field - should show 16384 (0x4000)
```

## 📚 Resources

- [Android 16 KB Page Size Guide](https://developer.android.com/guide/practices/page-sizes)
- [Google Play Console - App Bundle Explorer](https://support.google.com/googleplay/android-developer/answer/9845364)

## ✅ Summary

The configuration is now complete. The `android.enable16kPages=true` property is the critical setting that enables 16 KB page size support. Combined with AGP 8.7.1, this should ensure all native libraries are properly aligned.

If Google Play still rejects the app, it's likely due to prebuilt libraries from dependencies that aren't 16 KB aligned. In that case, you'll need to:
1. Identify which libraries are failing (via Play Console)
2. Update those libraries to versions that support 16 KB
3. Or wait for library maintainers to release 16 KB-compatible versions

