import { Platform } from 'react-native'

// 10.0.2.2 for default Android Simulator
export const LOCAL_IP = Platform.OS === 'ios' ? '127.0.0.1' : '10.0.3.2'

export const API_BASE = 'http://103.90.228.46:8070'
//export const API_BASE = 'http://192.168.16.175:8070'
export const API_TIMEOUT = 10000
export const FIREBASE_CONFIG = {
    apiKey: 'AIzaSyC3E7eEL_0o_ngS6mNWyfiR05bZsYjWZqg',
    authDomain: 'phonect-trial-app.firebaseapp.com',
    databaseURL: 'https://phonect-trial-app.firebaseio.com',
    storageBucket: 'phonect-trial-app.appspot.com',
}

// export const IOS_CLIENT_ID = '1095712347791-5is9hjvqvg71a6a70q0f5bqbrmuls7nv.apps.googleusercontent.com'

export const SOCIAL_CONFIG = {
    twitter: {
        consumer_key: 'SHdlhmSexV0yBgvVQI0qdxK8n',
        consumer_secret: 'o2s9ArLF2lgeO0LsyWQyu68jfTirgk1kWLBrrhx2BuaMBtTVqK'
    },
    facebook: {
        client_id: '1095712347791',
        client_secret: '88213a66ff8fc3cb4d488f55bce87cd6'  
    },
    google: {
        'callback_url': 'com.googleusercontent.apps.1095712347791-5is9hjvqvg71a6a70q0f5bqbrmuls7nv:/google',
        client_id: '1095712347791-5is9hjvqvg71a6a70q0f5bqbrmuls7nv.apps.googleusercontent.com',
    }
}

export const GOOGLE_API_KEY = 'AIzaSyAsZOFysS1-Zldw75QQwQ-iyyed_04hSCs'