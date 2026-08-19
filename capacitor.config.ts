import type { CapacitorConfig } from '@capacitor/cli'

const config: CapacitorConfig = {
  appId: 'com.senac.tarefas',
  appName: 'galeria_fotinhos',
  webDir: 'dist',

  plugins: {
    Camera: {
      permissions: ['camera', 'photos']
    },

    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#003F6B'
    },
    Keyboard: {
      resieze: "body",
    }
  }
}

export default config