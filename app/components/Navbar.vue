<template>
  <nav class="navbar">
    <div class="nav-container">
      <div class="nav-brand">
        <NuxtLink to="/">Todo App</NuxtLink>
      </div>
      <div class="nav-links">
        <template v-if="status === 'authenticated'">
          <NuxtLink to="/" class="nav-link">Home</NuxtLink>
          <NuxtLink to="/profile" class="nav-link">Profile</NuxtLink>
          <button @click="handleLogout" class="btn-logout">Logout</button>
        </template>
        <template v-else>
          <button @click="handleLogin" class="btn-login">Login</button>
        </template>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
const { status, signIn, signOut } = useAuth()

const handleLogin = () => {
  signIn('keycloak')
}

const handleLogout = () => {
  signOut({ callbackUrl: '/' })
}
</script>

<style scoped>
.navbar {
  background-color: #2c3e50;
  padding: 1rem 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-brand a {
  color: white;
  font-size: 1.5rem;
  font-weight: bold;
  text-decoration: none;
}

.nav-links {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.nav-link {
  color: white;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.nav-link:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.btn-login,
.btn-logout {
  background-color: #3498db;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s;
}

.btn-login:hover,
.btn-logout:hover {
  background-color: #2980b9;
}

.btn-logout {
  background-color: #e74c3c;
}

.btn-logout:hover {
  background-color: #c0392b;
}
</style>
