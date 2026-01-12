<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/user'
import { onMounted } from 'vue'

const router = useRouter()
const userStore = useUserStore()

// 检查用户是否登录
onMounted(() => {
  if (!userStore.isLoggedIn) {
    router.push('/user/login')
  }
})
</script>

<template>
  <div class="profile-container">
    <!-- 顶部导航 -->
    <header class="top-header">
      <div class="header-content">
        <div class="logo" @click="router.push('/')">
          <span class="logo-icon">🐱</span>
          <span class="logo-text">NoCode</span>
        </div>
        <nav class="main-nav">
          <a href="#" class="nav-item">使用文档</a>
          <a href="#" class="nav-item">交流社区</a>
          <a href="#" class="nav-item">更多产品</a>
        </nav>
        <div class="header-right">
          <button class="search-btn">🔍</button>
          <div class="user-profile">
            <div class="user-info">
              <span class="user-name">{{ userStore.userName }}</span>
            </div>
            <img :src="userStore.userAvatar" alt="用户头像" class="user-avatar" />
          </div>
        </div>
      </div>
    </header>

    <!-- 个人中心内容 -->
    <section class="profile-content">
      <!-- 用户信息区域 -->
      <div class="profile-header">
        <div class="avatar-container">
          <img :src="userStore.userAvatar" alt="用户头像" class="profile-avatar" />
        </div>
        <div class="user-details">
          <h1 class="profile-name">{{ userStore.userName }}</h1>
          <div class="user-stats">
            <span class="stat-item">关注 <strong>0</strong></span>
            <span class="stat-divider">·</span>
            <span class="stat-item">粉丝 <strong>0</strong></span>
          </div>
          <div class="user-bio">
            <p>NoCode创新家，快来丰富你的个人介绍~</p>
          </div>
        </div>
      </div>

      <!-- 标签页导航 -->
      <div class="profile-tabs">
        <div class="tab-item active">作品</div>
        <div class="tab-item">文章</div>
        <div class="tab-item">关注</div>
      </div>

      <!-- 作品展示区域 -->
      <div class="profile-works">
        <div class="no-works">
          <p>未找到作品</p>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.profile-container {
  min-height: 100vh;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  background-color: #fff;
}

/* 顶部导航 */
.top-header {
  background-color: #fff;
  border-bottom: 1px solid #e5e7eb;
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.5rem;
  font-weight: bold;
  color: #111827;
  cursor: pointer;
}

.logo-icon {
  font-size: 1.8rem;
}

.main-nav {
  display: flex;
  gap: 2rem;
}

.nav-item {
  text-decoration: none;
  color: rgba(17, 24, 39, 0.7);
  font-weight: 500;
  transition: color 0.2s;
  font-size: 14px;
}

.nav-item:hover {
  color: #111827;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.search-btn {
  background: none;
  border: none;
  font-size: 16px;
  cursor: pointer;
  color: rgba(17, 24, 39, 0.7);
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.search-btn:hover {
  background-color: rgba(0, 0, 0, 0.05);
}

/* 用户信息区域 */
.profile-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.profile-header {
  display: flex;
  align-items: center;
  gap: 2rem;
  margin-bottom: 3rem;
}

.avatar-container {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  overflow: hidden;
  border: 4px solid #fff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.profile-avatar {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.user-details {
  flex: 1;
}

.profile-name {
  font-size: 2rem;
  font-weight: bold;
  color: #111827;
  margin-bottom: 0.5rem;
}

.user-stats {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
  font-size: 1rem;
  color: #6b7280;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.stat-divider {
  color: #d1d5db;
}

.user-bio {
  font-size: 1rem;
  color: #6b7280;
  line-height: 1.5;
}

/* 标签页导航 */
.profile-tabs {
  display: flex;
  border-bottom: 1px solid #e5e7eb;
  margin-bottom: 2rem;
}

.tab-item {
  padding: 1rem 2rem;
  font-size: 1rem;
  font-weight: 500;
  color: #6b7280;
  cursor: pointer;
  transition: all 0.2s;
  border-bottom: 2px solid transparent;
}

.tab-item:hover {
  color: #111827;
}

.tab-item.active {
  color: #111827;
  border-bottom-color: #111827;
}

/* 作品展示区域 */
.profile-works {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

.no-works {
  grid-column: 1 / -1;
  text-align: center;
  padding: 4rem 2rem;
  color: #6b7280;
  font-size: 1.1rem;
  background-color: #f9fafb;
  border-radius: 8px;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .profile-header {
    flex-direction: column;
    text-align: center;
  }
  
  .profile-name {
    font-size: 1.75rem;
  }
  
  .user-stats {
    justify-content: center;
  }
  
  .profile-tabs {
    justify-content: center;
  }
  
  .tab-item {
    padding: 0.75rem 1rem;
  }
}
</style>