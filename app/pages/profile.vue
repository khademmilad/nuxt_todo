<template>
  <div class="profile-container">
    <div v-if="status === 'authenticated'" class="profile-card">
      <h1 class="profile-title">User Profile</h1>
      
      <div class="profile-info">
        <div class="info-item">
          <label>Name:</label>
          <span>{{ session?.user?.name || 'N/A' }}</span>
        </div>
        
        <div class="info-item">
          <label>Email:</label>
          <span>{{ session?.user?.email || 'N/A' }}</span>
        </div>

        <div v-if="session?.user?.image" class="info-item">
          <label>Avatar:</label>
          <img :src="session.user.image" alt="User avatar" class="avatar" />
        </div>
      </div>

      <div class="session-details">
        <h2>Session Details</h2>
        <pre>{{ JSON.stringify(session, null, 2) }}</pre>
      </div>
    </div>

    <div v-else class="loading">
      <p>Loading profile...</p>
    </div>
  </div>
</template>

<script setup lang="ts">
// Protect this page - require authentication
definePageMeta({
  middleware: 'auth'
})

const { status, data: session } = useAuth()
</script>

<style scoped>
.profile-container {
  max-width: 800px;
  margin: 0 auto;
}

.profile-card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 2rem;
}

.profile-title {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 2rem;
  color: #2c3e50;
  border-bottom: 2px solid #3498db;
  padding-bottom: 0.5rem;
}

.profile-info {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
}

.info-item {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.info-item label {
  font-weight: bold;
  min-width: 150px;
  color: #555;
}

.info-item span {
  color: #333;
}

.avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 3px solid #3498db;
}

.session-details {
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid #e0e0e0;
}

.session-details h2 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #2c3e50;
}

.session-details pre {
  background: #f5f5f5;
  padding: 1rem;
  border-radius: 4px;
  overflow-x: auto;
  font-size: 0.875rem;
  color: #333;
}

.loading {
  text-align: center;
  padding: 2rem;
  font-size: 1.25rem;
  color: #666;
}
</style>
