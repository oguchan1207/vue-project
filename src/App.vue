<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { useAuth0 } from '@auth0/auth0-vue';

const { loginWithRedirect, isAuthenticated, isLoading, logout } = useAuth0();

const login = () => {
  loginWithRedirect()
};

const handleLogout = () =>
  logout({
    logoutParams: {
      returnTo: window.location.origin,
    }
  });

</script>

<template>
  <header>
    <div class="wrapper">
      <h1>飲食予約アプリ</h1>

      <div class="login">
        <div v-if="!isLoading">
      <a href="#" v-if="!isAuthenticated" @click="login">ログイン</a>
      <a href="#" v-if="isAuthenticated" @click="handleLogout">ログアウト</a>
    </div>
  </div>
      <nav>
        <div v-if="!isLoading">
        <RouterLink to="/">Home</RouterLink>
        <RouterLink v-if="!isAuthenticated" to="/UserEntry">利用者登録</RouterLink>
        <RouterLink v-if="isAuthenticated" to="/userUpdate">利用者更新</RouterLink>
        <RouterLink to="/about">About</RouterLink>
    </div>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.login {
  margin-right: 0;
  margin-left: auto;
  width: 20%;
  cursor:pointer
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
