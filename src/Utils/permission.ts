import {PermissionsAndroid, Platform} from 'react-native';

const maybeAskForFileStoragePermission = async () => {
  if (Platform.OS === 'android') {
    let permissionGranted = false;
    // TODO: figure out how to optimise this to request file permission.
    // while( !permissionGranted ) {
    if (!permissionGranted) {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Storage Access',
          message:
            'I need access to file storage to display / download the file(s)',
          buttonPositive: 'Allow',
        },
      );
      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        return false;
      } else {
        permissionGranted = true;
        return true;
      }
    }
  }
  return true;
};

const maybeAskForCameraPermission = async () => {
  if (Platform.OS === 'android') {
    let permissionGranted = false;
    // TODO: figure out how to optimise this to request file permission.
    // while( !permissionGranted ) {
    if (!permissionGranted) {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Camera Access',
          message: 'The app needs access to your device camera',
          buttonPositive: 'Allow',
        },
      );
      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        return false;
      } else {
        permissionGranted = true;
        return true;
      }
    }
  }
  return true;
};

export {maybeAskForCameraPermission, maybeAskForFileStoragePermission};
