//import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createAuth0 } from '@auth0/auth0-vue';

const app = createApp(App)

app
.use(router)
//Auth0 Vue SDK から認証プラグインのインスタンスを定義
.use(
  createAuth0({
    domain: "dev-miyln068b6hrc4ck.us.auth0.com",
    clientId: "Mvf2597dHnItZuby1E84LdYuaRDh5bnz",
    authorizationParams: {
    redirect_uri: window.location.origin
    }
  })
);
  
app.mount('#app')

