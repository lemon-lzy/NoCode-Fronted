<script setup lang="ts">
// 定义案例数据
const cases = [
  {
    id: 1,
    title: 'NoCode创新挑战赛官网',
    description: '创新挑战赛重磅开启',
    type: '网站',
    date: '2024-01-03',
    author: '探索',
    image: 'https://via.placeholder.com/300x200/000000/ffffff?text=NoCode+%E5%88%9B%E6%96%B0%E6%8C%91%E6%88%98%E8%B5%9B'
  },
  {
    id: 2,
    title: '新居民',
    description: '',
    type: '用户应用',
    date: '2024-10-31',
    author: 'jdakjdoajkdkg',
    image: 'https://via.placeholder.com/300x200/FF6B6B/ffffff?text=%E6%96%B0%E5%B1%85%E6%B0%91'
  },
  {
    id: 3,
    title: '御家如意',
    description: '',
    type: '用户应用',
    date: '2024-11-01',
    author: 'RUH4G20E13002',
    image: 'https://via.placeholder.com/300x200/4ECDC4/ffffff?text=%E5%BE%A1%E5%AE%B6%E5%A6%82%E6%84%8F'
  },
  {
    id: 4,
    title: 'WePin (拼针)',
    description: 'WePin, We Share.',
    type: '用户应用',
    date: '2024-09-19',
    author: 'Kd16849761008',
    image: 'https://via.placeholder.com/300x200/FFD166/000000?text=WePin'
  },
  {
    id: 5,
    title: 'Echo回声',
    description: '',
    type: '用户应用',
    date: '2024-11-11',
    author: '橙子橙orangequokka',
    image: 'https://via.placeholder.com/300x200/06D6A0/ffffff?text=Echo%E5%9B%9E%E5%A3%B0'
  },
  {
    id: 6,
    title: '办公用品管理平台-相对...',
    description: '办公用品管理系统',
    type: '管理平台',
    date: '2024-11-07',
    author: 'NoCode小助手',
    image: 'https://via.placeholder.com/300x200/118AB2/ffffff?text=%E5%85%AC%E5%8A%A1%E7%94%A8%E5%93%81%E7%AE%A1%E7%90%86'
  },
  {
    id: 7,
    title: '双国时光',
    description: '',
    type: '管理平台',
    date: '2024-08-21',
    author: '请手12388',
    image: 'https://via.placeholder.com/300x200/073B4C/ffffff?text=%E5%8F%8C%E5%9B%BD%E6%97%B6%E5%85%89'
  },
  {
    id: 8,
    title: '智能饮食推荐面板',
    description: '智能饮食推荐面板',
    type: '管理平台',
    date: '2024-10-29',
    author: '1J1Z727',
    image: 'https://via.placeholder.com/300x200/FF9F1C/ffffff?text=%E6%99%BA%E8%83%BD%E9%A5%AE%E9%A3%9F%E6%8E%A8%E8%8D%90'
  }
]

// 定义分类标签
const categories = ['全部', '工具', '网站', '数据分析', '活动页面', '管理平台', '用户应用', '个人管理', '游戏']
</script>

<template>
  <div class="home-container">
    <!-- 顶部导航 -->
    <header class="top-header">
      <div class="header-content">
        <div class="logo">
          <span class="logo-icon">🐱</span>
          <span class="logo-text">NoCode</span>
        </div>
        <nav class="main-nav">
          <a href="#" class="nav-link">使用文档</a>
          <a href="#" class="nav-link">交流社区</a>
          <a href="#" class="nav-link">更多产品</a>
        </nav>
        <div class="header-right">
          <div class="notification">
            <span class="notification-icon">💬</span>
            <span class="notification-text">一句话需求：NoCode创新挑战赛重磅升级，丰厚大奖立即查看</span>
            <span class="notification-close">✕</span>
          </div>
          <button class="login-btn">登录</button>
        </div>
      </div>
    </header>

    <!-- 主要内容区域 -->
    <section class="main-content">
      <div class="content-wrapper">
        <h1 class="main-title">
          一句话
          <span class="logo-icon">🐱</span>
          呈所想
        </h1>
        <p class="sub-title">与AI对话轻松创建应用和网站</p>
        
        <div class="input-container">
          <input 
            type="text" 
            class="ai-input" 
            placeholder="使用 NoCode 创建一个信息管理系"
          />
          <div class="input-actions">
            <span class="action-item">上传</span>
            <span class="action-item">优化</span>
          </div>
          <div class="input-bottom">
            <span class="input-tag">旅游网页页面</span>
            <span class="input-tag">企业网站</span>
            <span class="input-tag">电商运营后台</span>
            <span class="input-tag">黑暗森林社区</span>
          </div>
        </div>
      </div>
    </section>

    <!-- 案例广场 -->
    <section class="case-section">
      <div class="case-container">
        <div class="case-header">
          <h2 class="case-title">案例广场</h2>
          <div class="case-controls">
            <select class="sort-select">
              <option>默认排序</option>
              <option>最新</option>
              <option>最受欢迎</option>
            </select>
            <div class="category-tabs">
              <button 
                v-for="category in categories" 
                :key="category"
                class="category-tab"
                :class="{ active: category === '全部' }"
              >
                {{ category }}
              </button>
            </div>
            <button class="all-cases-btn">全部案例 ›</button>
          </div>
        </div>
        
        <div class="case-grid">
          <div 
            v-for="item in cases" 
            :key="item.id"
            class="case-card"
          >
            <div class="case-image">
              <img :src="item.image" :alt="item.title" />
            </div>
            <div class="case-info">
              <h3 class="case-card-title">{{ item.title }}</h3>
              <p class="case-card-description">{{ item.description }}</p>
              <div class="case-meta">
                <span class="case-type">{{ item.type }}</span>
                <span class="case-date">{{ item.date }}</span>
                <span class="case-author">{{ item.author }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.home-container {
  min-height: 100vh;
  background-color: #fff;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
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
}

.logo-icon {
  font-size: 1.8rem;
}

.main-nav {
  display: flex;
  gap: 2rem;
}

.nav-link {
  color: #4b5563;
  text-decoration: none;
  font-size: 0.95rem;
  transition: color 0.2s;
}

.nav-link:hover {
  color: #111827;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.notification {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: #ecfdf5;
  border: 1px solid #d1fae5;
  border-radius: 0.5rem;
  font-size: 0.85rem;
  color: #065f46;
}

.notification-close {
  cursor: pointer;
  opacity: 0.7;
  transition: opacity 0.2s;
}

.notification-close:hover {
  opacity: 1;
}

.login-btn {
  padding: 0.5rem 1.5rem;
  background-color: #111827;
  color: #fff;
  border: none;
  border-radius: 0.5rem;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

.login-btn:hover {
  background-color: #374151;
}

/* 主要内容区域 */
.main-content {
  background: linear-gradient(to bottom, #fff, #f0fdfa, #ccfbf1);
  padding: 4rem 2rem;
  text-align: center;
}

.content-wrapper {
  max-width: 800px;
  margin: 0 auto;
}

.main-title {
  font-size: 3.5rem;
  font-weight: bold;
  color: #111827;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

.sub-title {
  font-size: 1.25rem;
  color: #6b7280;
  margin-bottom: 3rem;
}

.input-container {
  background-color: #fff;
  border-radius: 1rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  max-width: 700px;
  margin: 0 auto;
}

.ai-input {
  width: 100%;
  padding: 1rem;
  font-size: 1.1rem;
  border: 2px solid #e5e7eb;
  border-radius: 0.75rem;
  margin-bottom: 1rem;
  outline: none;
  transition: border-color 0.2s;
}

.ai-input:focus {
  border-color: #10b981;
}

.input-actions {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  justify-content: flex-end;
}

.action-item {
  padding: 0.5rem 1rem;
  background-color: #f3f4f6;
  border-radius: 0.5rem;
  font-size: 0.9rem;
  color: #6b7280;
  cursor: pointer;
  transition: background-color 0.2s;
}

.action-item:hover {
  background-color: #e5e7eb;
}

.input-bottom {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
  justify-content: center;
}

.input-tag {
  padding: 0.5rem 1rem;
  background-color: #f3f4f6;
  border-radius: 0.75rem;
  font-size: 0.9rem;
  color: #4b5563;
  cursor: pointer;
  transition: background-color 0.2s;
}

.input-tag:hover {
  background-color: #e5e7eb;
}

/* 案例广场 */
.case-section {
  padding: 4rem 2rem;
  background-color: #fff;
}

.case-container {
  max-width: 1200px;
  margin: 0 auto;
}

.case-header {
  margin-bottom: 2rem;
}

.case-title {
  font-size: 1.75rem;
  font-weight: bold;
  color: #111827;
  margin-bottom: 1rem;
}

.case-controls {
  display: flex;
  align-items: center;
  gap: 2rem;
  flex-wrap: wrap;
}

.sort-select {
  padding: 0.5rem 1rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  font-size: 0.9rem;
  color: #4b5563;
  cursor: pointer;
}

.category-tabs {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.category-tab {
  padding: 0.5rem 1.25rem;
  background-color: #f3f4f6;
  border: none;
  border-radius: 0.75rem;
  font-size: 0.9rem;
  color: #4b5563;
  cursor: pointer;
  transition: all 0.2s;
}

.category-tab:hover {
  background-color: #e5e7eb;
}

.category-tab.active {
  background-color: #111827;
  color: #fff;
}

.all-cases-btn {
  padding: 0.5rem 1rem;
  background-color: transparent;
  border: none;
  font-size: 0.9rem;
  color: #4b5563;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.all-cases-btn:hover {
  color: #111827;
}

/* 案例网格 */
.case-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
}

.case-card {
  background-color: #fff;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s, box-shadow 0.2s;
  cursor: pointer;
}

.case-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.case-image {
  width: 100%;
  height: 180px;
  overflow: hidden;
}

.case-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.case-info {
  padding: 1.5rem;
}

.case-card-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: #111827;
  margin-bottom: 0.5rem;
}

.case-card-description {
  font-size: 0.9rem;
  color: #6b7280;
  margin-bottom: 1rem;
  height: 36px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.case-meta {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.8rem;
  color: #9ca3af;
}

.case-type {
  background-color: #f3f4f6;
  padding: 0.25rem 0.5rem;
  border-radius: 0.375rem;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .header-content {
    flex-direction: column;
    gap: 1rem;
  }

  .main-nav {
    gap: 1rem;
  }

  .header-right {
    flex-direction: column;
    gap: 1rem;
  }

  .main-title {
    font-size: 2.5rem;
  }

  .case-controls {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }

  .category-tabs {
    width: 100%;
    overflow-x: auto;
    padding-bottom: 0.5rem;
  }

  .case-grid {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  }
}
</style>
