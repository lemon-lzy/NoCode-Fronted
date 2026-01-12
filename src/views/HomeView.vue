<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/user'
import { onMounted, onUnmounted, ref } from 'vue'
import { userLogout } from '../api/userController'

const router = useRouter()
const userStore = useUserStore()

// 跳转到登录页面
const goToLogin = () => {
  router.push('/user/login')
}

// 下拉菜单状态
const showDropdown = ref(false)

// 切换下拉菜单
const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value
}

// 点击外部关闭下拉菜单
const handleClickOutside = (event: MouseEvent) => {
  const dropdown = document.querySelector('.dropdown-menu')
  const profile = document.querySelector('.user-profile')
  if (dropdown && profile && !dropdown.contains(event.target as Node) && !profile.contains(event.target as Node)) {
    showDropdown.value = false
  }
}

// 添加点击外部关闭事件
onMounted(() => {
  userStore.initUserInfo()
  document.addEventListener('click', handleClickOutside)
})

// 移除点击外部关闭事件
onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})

// 退出登录处理
const handleLogout = async () => {
  try {
    // 调用退出登录接口
    await userLogout()
    // 清空用户信息
    userStore.clearUserInfo()
    // 关闭下拉菜单
    showDropdown.value = false
    // 跳转到首页
    router.push('/')
  } catch (error) {
    console.error('退出登录失败:', error)
    // 即使接口调用失败，也要清空本地用户信息
    userStore.clearUserInfo()
    showDropdown.value = false
    router.push('/')
  }
}

// 案例数据
const caseData = [
  {
    id: 1,
    title: '电商网站',
    description: '使用NoCode快速搭建的电商平台，包含商品展示、购物车、支付功能',
    image: 'https://picsum.photos/seed/ecommerce/300/200'
  },
  {
    id: 2,
    title: '企业官网',
    description: '现代化企业官网，响应式设计，支持多语言切换',
    image: 'https://picsum.photos/seed/corporate/300/200'
  },
  {
    id: 3,
    title: '个人博客',
    description: '简洁美观的个人博客系统，支持文章分类、评论功能',
    image: 'https://picsum.photos/seed/blog/300/200'
  },
  {
    id: 4,
    title: 'CRM系统',
    description: '客户关系管理系统，帮助企业管理客户信息和销售流程',
    image: 'https://picsum.photos/seed/crm/300/200'
  },
  {
    id: 5,
    title: '数据分析面板',
    description: '直观的数据可视化面板，实时展示业务数据',
    image: 'https://picsum.photos/seed/analytics/300/200'
  },
  {
    id: 6,
    title: '活动报名页面',
    description: '美观的活动报名页面，支持在线支付和统计',
    image: 'https://picsum.photos/seed/event/300/200'
  }
]
</script>

<template>
  <div class="home-container">
    <!-- 顶部通知栏 -->
    <div class="top-notice">
      <div class="notice-content">
        <span class="notice-icon">💡</span>
        <span class="notice-text">NoCode新增批量生成功能，半天即可搭建完整应用，</span>
        <a href="#" class="notice-link">立即查看</a>
        <button class="close-btn">×</button>
      </div>
    </div>

    <!-- 顶部导航 -->
    <header class="top-header">
      <div class="header-content">
        <div class="logo">
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
          <!-- 登录后显示用户信息 -->
          <div v-if="userStore.isLoggedIn" class="user-profile" @click="toggleDropdown">
            <div class="user-info">
              <span class="user-name">{{ userStore.userName }}</span>
            </div>
            <img :src="userStore.userAvatar" alt="用户头像" class="user-avatar" />
          </div>
          <!-- 未登录时显示登录按钮 -->
          <button v-else class="login-btn" @click="goToLogin">登录</button>
          
          <!-- 下拉菜单 -->
          <div v-if="userStore.isLoggedIn && showDropdown" class="dropdown-menu">
            <!-- 用户管理（仅管理员可见） -->
            <div v-if="userStore.userInfo?.userRole === 'admin'" class="dropdown-item" @click.stop="router.push('/admin/user-management')">
              <span class="item-icon">⚙️</span>
              <span class="item-text">用户管理</span>
            </div>
            <!-- 个人中心 -->
            <div class="dropdown-item" @click.stop="router.push('/user/profile')">
              <span class="item-icon">👤</span>
              <span class="item-text">个人中心</span>
            </div>
            <!-- 退出登录 -->
            <div class="dropdown-item logout-item" @click.stop="handleLogout">
              <span class="item-icon">🚪</span>
              <span class="item-text">退出登录</span>
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- 主要内容区域 -->
    <section class="main-content">
      <div class="content-wrapper">
        <h1 class="main-title">一句话 🐱 呈所想</h1>
        <p class="main-subtitle">与AI对话轻松创建应用和网站</p>
        
        <!-- AI输入区域 -->
        <div class="ai-input-area">
          <div class="dialog-box">
            <div class="input-row">
              <input
                type="text"
                class="ai-input"
                placeholder="使用NoCode创建一个数据分析看板，"
                :disabled="!userStore.isLoggedIn"
              />
              <button class="ai-submit-btn" :disabled="!userStore.isLoggedIn">
                <span class="submit-icon">↑</span>
              </button>
            </div>
            <!-- 未登录提示 -->
            <div v-if="!userStore.isLoggedIn" class="login-prompt">
              <span>请先登录后使用AI对话功能</span>
            </div>
          </div>
          
          <!-- 快速选项标签 -->
          <div class="quick-options">
            <span class="option-tag" :class="{ 'disabled': !userStore.isLoggedIn }" @click="!userStore.isLoggedIn && goToLogin()">炫酷电商页面</span>
            <span class="option-tag" :class="{ 'disabled': !userStore.isLoggedIn }" @click="!userStore.isLoggedIn && goToLogin()">企业官网</span>
            <span class="option-tag" :class="{ 'disabled': !userStore.isLoggedIn }" @click="!userStore.isLoggedIn && goToLogin()">电商运营后台</span>
            <span class="option-tag" :class="{ 'disabled': !userStore.isLoggedIn }" @click="!userStore.isLoggedIn && goToLogin()">赚钱社区</span>
          </div>
        </div>
      </div>
    </section>

    <!-- 案例展示区 -->
    <section class="case-section">
      <div class="case-wrapper">
        <div class="case-header">
          <h2 class="case-title">案例广场</h2>
          <div class="case-filters">
            <div class="filter-dropdown">
              <button class="filter-btn">默认排序</button>
            </div>
            <div class="filter-actions">
              <button class="view-all-btn">全部案例</button>
              <button class="refresh-btn">🔄</button>
            </div>
          </div>
        </div>
        
        <!-- 筛选标签 -->
        <div class="case-tags">
          <span class="tag active">全部</span>
          <span class="tag">工具</span>
          <span class="tag">网站</span>
          <span class="tag">数据分析</span>
          <span class="tag">活动页面</span>
          <span class="tag">管理平台</span>
          <span class="tag">用户应用</span>
          <span class="tag">个人管理</span>
          <span class="tag">游戏</span>
        </div>
        
        <div class="case-grid">
          <div v-for="caseItem in caseData" :key="caseItem.id" class="case-card">
            <div class="case-image">
              <img :src="caseItem.image" :alt="caseItem.title" />
            </div>
            <div class="case-info">
              <h3 class="case-card-title">{{ caseItem.title }}</h3>
              <p class="case-card-description">{{ caseItem.description }}</p>
              <button class="case-view-btn">查看详情</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
/* 全局样式重置 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.home-container {
  min-height: 100vh;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  position: relative;
}

/* 顶部通知栏 */
.top-notice {
  background-color: #d1fae5;
  padding: 0.5rem 0;
  text-align: center;
  font-size: 12px;
  color: #065f46;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 101;
}

.notice-content {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  max-width: 1200px;
  margin: 0 auto;
}

.notice-icon {
  font-size: 14px;
}

.notice-link {
  color: #059669;
  text-decoration: none;
  font-weight: 500;
}

.close-btn {
  background: none;
  border: none;
  font-size: 14px;
  cursor: pointer;
  color: #065f46;
  margin-left: 0.5rem;
}

/* 顶部导航 */
.top-header {
  background-color: transparent;
  position: absolute;
  top: 28px;
  left: 0;
  right: 0;
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
}

.logo-icon {
  font-size: 1.75rem;
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

.login-btn {
  padding: 0.5rem 1.5rem;
  background-color: rgba(255, 255, 255, 0.9);
  color: #111827;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 14px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.login-btn:hover {
  background-color: #fff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

/* 用户信息样式 */
.user-profile {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.user-info {
  display: flex;
  align-items: center;
}

.user-name {
  font-size: 14px;
  font-weight: 500;
  color: #111827;
}

.user-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid rgba(255, 255, 255, 0.8);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

/* 下拉菜单样式 */
.dropdown-menu {
  position: absolute;
  top: 100%;
  right: 2rem;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  width: 240px;
  z-index: 1000;
  margin-top: 0.5rem;
  padding: 0.5rem 0;
}

/* 下拉菜单项样式 */
.dropdown-item {
  display: flex;
  align-items: center;
  padding: 0.75rem 1rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

.dropdown-item:hover {
  background-color: #f9fafb;
}

/* 下拉菜单项图标 */
.item-icon {
  margin-right: 0.75rem;
  font-size: 16px;
}

/* 下拉菜单项文本 */
.item-text {
  font-size: 14px;
  color: #374151;
}

/* 退出登录项样式 */
.logout-item {
  color: #ef4444;
  margin-top: 0.5rem;
  border-top: 1px solid #e5e7eb;
}

.logout-item .item-text {
  color: #ef4444;
}

/* 使用户资料区域可点击 */
.user-profile {
  cursor: pointer;
}

/* 主要内容区域 */
.main-content {
  background: linear-gradient(135deg, #ffffff 0%, #e0f2fe 50%, #d1fae5 100%);
  padding: 10rem 2rem 8rem;
  text-align: center;
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.content-wrapper {
  max-width: 1200px;
  margin: 0 auto;
}

.main-title {
  font-size: 3rem;
  font-weight: bold;
  color: #111827;
  margin-bottom: 1rem;
  line-height: 1.2;
}

.main-subtitle {
  font-size: 1.25rem;
  color: #6b7280;
  margin-bottom: 3rem;
}

/* AI输入区域 */
.ai-input-area {
  margin-top: 4rem;
  width: 100%;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
}

.dialog-box {
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  padding: 0;
  margin-bottom: 2rem;
  border: 1px solid rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.input-row {
  display: flex;
  gap: 0;
  margin: 0;
  align-items: stretch;
  height: 56px;
}

.input-prefix {
  padding: 0 16px;
  background-color: #f9fafb;
  border-right: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: #6b7280;
  font-weight: 500;
}

.ai-input {
  flex: 1;
  padding: 0 16px;
  border: none;
  border-right: 1px solid rgba(0, 0, 0, 0.1);
  font-size: 14px;
  outline: none;
  transition: all 0.2s ease;
  font-family: inherit;
  line-height: 1.5;
  background-color: #fff;
}

.ai-input:focus {
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.05);
}

.ai-submit-btn {
  padding: 0 20px;
  background-color: #fff;
  color: rgba(0, 0, 0, 0.5);
  border: none;
  font-size: 18px;
  font-weight: normal;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.ai-submit-btn:hover {
  background-color: rgba(0, 0, 0, 0.02);
  color: rgba(0, 0, 0, 0.7);
}

.submit-icon {
  display: inline-block;
  font-size: 18px;
  line-height: 1;
}

/* 快速选项标签 */
.quick-options {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 12px;
}

.option-tag {
  padding: 8px 16px;
  background-color: rgba(255, 255, 255, 0.8);
  color: rgba(0, 0, 0, 0.5);
  border-radius: 16px;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1px solid rgba(0, 0, 0, 0.08);
  white-space: nowrap;
}

.option-tag:hover {
  background-color: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  color: rgba(0, 0, 0, 0.7);
}

/* 未登录提示样式 */
.login-prompt {
  background-color: #fef3c7;
  color: #92400e;
  padding: 0.75rem 1rem;
  font-size: 12px;
  text-align: left;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}

/* 禁用状态样式 */
.ai-input:disabled {
  background-color: #f9fafb;
  cursor: not-allowed;
  opacity: 0.7;
}

.ai-submit-btn:disabled {
  background-color: #f9fafb;
  cursor: not-allowed;
  opacity: 0.5;
}

.option-tag.disabled {
  background-color: #f3f4f6;
  color: #9ca3af;
  cursor: not-allowed;
}

.option-tag.disabled:hover {
  background-color: #f3f4f6;
  box-shadow: none;
  color: #9ca3af;
}

/* 案例展示区 */
.case-section {
  padding: 6rem 2rem 4rem;
  background-color: #fff;
}

.case-wrapper {
  max-width: 1200px;
  margin: 0 auto;
}

.case-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.case-title {
  font-size: 1.75rem;
  font-weight: bold;
  color: #111827;
  margin: 0;
}

.case-filters {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.filter-dropdown {
  position: relative;
}

.filter-btn {
  padding: 0.5rem 1rem;
  background-color: transparent;
  color: #111827;
  border: 2px solid #e5e7eb;
  border-radius: 0.5rem;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s;
}

.filter-btn:hover {
  background-color: #f3f4f6;
}

.filter-actions {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.view-all-btn {
  padding: 0.5rem 1rem;
  background-color: transparent;
  color: #111827;
  border: 2px solid #e5e7eb;
  border-radius: 0.5rem;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s;
}

.view-all-btn:hover {
  background-color: #f3f4f6;
}

.refresh-btn {
  background: none;
  border: 2px solid #e5e7eb;
  border-radius: 0.5rem;
  font-size: 1rem;
  cursor: pointer;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.refresh-btn:hover {
  background-color: #f3f4f6;
}

/* 筛选标签 */
.case-tags {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e5e7eb;
}

.tag {
  padding: 0.5rem 1rem;
  background-color: transparent;
  color: #6b7280;
  border: 2px solid #e5e7eb;
  border-radius: 1.5rem;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s;
}

.tag:hover {
  background-color: #f3f4f6;
}

.tag.active {
  background-color: #111827;
  color: #fff;
  border-color: #111827;
}

.case-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
}

.case-card {
  background-color: #f9fafb;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s, box-shadow 0.2s;
}

.case-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

.case-image {
  width: 100%;
  height: 200px;
  overflow: hidden;
}

.case-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;
}

.case-card:hover .case-image img {
  transform: scale(1.05);
}

.case-info {
  padding: 1.5rem;
}

.case-card-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #111827;
  margin-bottom: 0.5rem;
}

.case-card-description {
  font-size: 0.95rem;
  color: #6b7280;
  margin-bottom: 1rem;
  line-height: 1.5;
}

.case-view-btn {
  padding: 0.5rem 1rem;
  background-color: transparent;
  color: #111827;
  border: 2px solid #e5e7eb;
  border-radius: 0.5rem;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.case-view-btn:hover {
  background-color: #111827;
  color: #fff;
}

/* 响应式设计 */
@media (max-width: 1024px) {
  .main-title {
    font-size: 2.5rem;
  }
  
  .case-grid {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  }
}

@media (max-width: 768px) {
  .top-notice {
    display: none;
  }
  
  .top-header {
    top: 0;
  }
  
  .header-content {
    padding: 1rem;
  }
  
  .main-nav {
    display: none;
  }
  
  .main-title {
    font-size: 2rem;
  }
  
  .main-subtitle {
    font-size: 1.1rem;
  }
  
  .ai-input-area {
    max-width: 100%;
  }
  
  .input-prefix {
    display: none;
  }
  
  .case-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
  
  .case-tags {
    gap: 0.5rem;
  }
  
  .tag {
    padding: 0.4rem 0.8rem;
    font-size: 0.8rem;
  }
  
  .case-grid {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1.5rem;
  }
}
</style>