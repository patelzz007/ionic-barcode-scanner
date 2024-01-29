import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.bishen.basf',
  appName: 'barcode-scanner',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  }
};

export default config;
