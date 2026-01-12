<script setup lang="ts">
/// <reference path="../api/typings.d.ts" />
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/user'
import { listUserVoByPage, deleteUser } from '../api/userController'

const router = useRouter()
const userStore = useUserStore()

// 搜索条件
const searchParams = reactive<API.UserQueryRequest>({
  userName: '',
  pageNum: 1,
  pageSize: 10
})

// 用户列表数据
const userList = ref<API.UserVO[]>([])
const totalRow = ref(0)
const loading = ref(false)
const errorMessage = ref('')

// 检查用户权限
const checkPermission = () => {
  // 只有管理员角色可以访问
  if (!userStore.isLoggedIn || userStore.userInfo?.userRole !== 'admin') {
    router.push('/')
    return false
  }
  return true
}

// 获取用户列表
const getUserList = async () => {
  if (!checkPermission()) return
  
  loading.value = true
  errorMessage.value = ''
  
  try {
    const result = await listUserVoByPage(searchParams)
    
    if (result.data.code === 0) {
      userList.value = result.data.data?.records || []
      totalRow.value = result.data.data?.totalRow || 0
    } else {
      errorMessage.value = result.data.message || '获取用户列表失败'
    }
  } catch (error) {
    console.error('获取用户列表失败:', error)
    errorMessage.value = '网络错误，请稍后重试'
  } finally {
    loading.value = false
  }
}

// 搜索用户
const handleSearch = () => {
  searchParams.pageNum = 1
  getUserList()
}

// 清空搜索
const handleClear = () => {
  searchParams.userName = ''
  searchParams.pageNum = 1
  getUserList()
}

// 删除用户
const handleDelete = async (userId: number) => {
  if (!confirm('确定要删除该用户吗？')) return
  
  try {
    const result = await deleteUser({ id: userId })
    
    if (result.data.code === 0) {
      // 删除成功，刷新列表
      getUserList()
    } else {
      alert(result.data.message || '删除用户失败')
    }
  } catch (error) {
    console.error('删除用户失败:', error)
    alert('网络错误，请稍后重试')
  }
}

// 分页处理
const handlePageChange = (pageNum: number) => {
  searchParams.pageNum = pageNum
  getUserList()
}

// 初始化
onMounted(() => {
  checkPermission()
  getUserList()
})
</script>

<template>
  <div class="user-management-container">
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

    <!-- 页面内容 -->
    <main class="content">
      <div class="container">
        <h1 class="page-title">用户管理</h1>
        
        <!-- 错误提示 -->
        <div v-if="errorMessage" class="error-message">
          {{ errorMessage }}
        </div>
        
        <!-- 搜索栏 -->
        <div class="search-bar">
          <input 
            v-model="searchParams.userName" 
            type="text" 
            placeholder="输入用户名搜索" 
            class="search-input"
            @keyup.enter="handleSearch"
          />
          <button @click="handleSearch" class="search-btn-primary" :disabled="loading">
            {{ loading ? '搜索中...' : '搜索' }}
          </button>
          <button @click="handleClear" class="clear-btn">清空</button>
        </div>
        
        <!-- 用户列表表格 -->
        <div class="table-container">
          <table class="user-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>用户名</th>
                <th>账号</th>
                <th>头像</th>
                <th>角色</th>
                <th>创建时间</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="loading" class="loading-row">
                <td colspan="7" class="text-center">加载中...</td>
              </tr>
              <tr v-else-if="userList.length === 0" class="empty-row">
                <td colspan="7" class="text-center">暂无用户数据</td>
              </tr>
              <tr v-for="user in userList" :key="user.id">
                <td>{{ user.id }}</td>
                <td>{{ user.userName || '-' }}</td>
                <td>{{ user.userAccount }}</td>
                <td>
                  <img :src="user.userAvatar || 'https://picsum.photos/seed/useravatar/40/40'" 
                       alt="用户头像" 
                       class="table-avatar"
                  />
                </td>
                <td>
                  <span class="role-tag" :class="user.userRole">
                    {{ user.userRole === 'admin' ? '管理员' : '普通用户' }}
                  </span>
                </td>
                <td>{{ user.createTime?.slice(0, 19) }}</td>
                <td>
                  <button @click="handleDelete(user.id!)" class="delete-btn">删除</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <!-- 分页 -->
        <div v-if="totalRow > 0" class="pagination">
          <button 
            @click="handlePageChange(1)" 
            :disabled="searchParams.pageNum === 1 || loading"
            class="page-btn"
          >
            首页
          </button>
          <button 
            @click="handlePageChange((searchParams.pageNum || 1) - 1)" 
            :disabled="(searchParams.pageNum || 1) === 1 || loading"
            class="page-btn"
          >
            上一页
          </button>
          
          <span class="page-info">
            第 {{ searchParams.pageNum || 1 }} 页 / 共 {{ Math.ceil(totalRow / (searchParams.pageSize || 10)) }} 页
          </span>
          
          <button 
            @click="handlePageChange((searchParams.pageNum || 1) + 1)" 
            :disabled="(searchParams.pageNum || 1) >= Math.ceil(totalRow / (searchParams.pageSize || 10)) || loading"
            class="page-btn"
          >
            下一页
          </button>
          <button 
            @click="handlePageChange(Math.ceil(totalRow / (searchParams.pageSize || 10)))" 
            :disabled="(searchParams.pageNum || 1) >= Math.ceil(totalRow / (searchParams.pageSize || 10)) || loading"
            class="page-btn"
          >
            末页
          </button>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
.user-management-container {
  min-height: 100vh;
  background-color: #f9fafb;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
}

/* 顶部导航 */
.top-header {
  background-color: #fff;
  border-bottom: 1px solid #e5e7eb;
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

.user-profile {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.user-name {
  font-size: 0.95rem;
  font-weight: 500;
  color: #374151;
}

.user-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
  cursor: pointer;
}

/* 页面内容 */
.content {
  padding: 2rem;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  background-color: #fff;
  border-radius: 0.75rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  padding: 2rem;
}

.page-title {
  font-size: 1.5rem;
  font-weight: bold;
  color: #111827;
  margin-bottom: 1.5rem;
}

/* 错误提示 */
.error-message {
  background-color: #fee2e2;
  color: #b91c1c;
  padding: 0.75rem;
  border-radius: 0.5rem;
  margin-bottom: 1.5rem;
  font-size: 0.9rem;
}

/* 搜索栏 */
.search-bar {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  align-items: center;
}

.search-input {
  flex: 1;
  max-width: 500px;
  padding: 0.75rem 1rem;
  border: 2px solid #e5e7eb;
  border-radius: 0.5rem;
  font-size: 1rem;
  transition: border-color 0.2s;
  outline: none;
}

.search-input:focus {
  border-color: #10b981;
}

.search-btn-primary {
  padding: 0.75rem 1.5rem;
  background-color: #111827;
  color: #fff;
  border: none;
  border-radius: 0.5rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
}

.search-btn-primary:hover:not(:disabled) {
  background-color: #374151;
}

.search-btn-primary:disabled {
  background-color: #9ca3af;
  cursor: not-allowed;
}

.clear-btn {
  padding: 0.75rem 1.5rem;
  background-color: #f3f4f6;
  color: #374151;
  border: 2px solid #e5e7eb;
  border-radius: 0.5rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.clear-btn:hover {
  background-color: #e5e7eb;
}

/* 表格 */
.table-container {
  overflow-x: auto;
  margin-bottom: 2rem;
}

.user-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.95rem;
}

.user-table th, .user-table td {
  padding: 1rem;
  text-align: left;
  border-bottom: 1px solid #e5e7eb;
}

.user-table th {
  background-color: #f9fafb;
  font-weight: 600;
  color: #374151;
}

.user-table tr:hover {
  background-color: #f9fafb;
}

.loading-row, .empty-row {
  text-align: center;
  color: #6b7280;
}

.text-center {
  text-align: center;
}

.table-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
}

.role-tag {
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  font-size: 0.8rem;
  font-weight: 500;
}

.role-tag.admin {
  background-color: #dbeafe;
  color: #1e40af;
}

.role-tag.user {
  background-color: #d1fae5;
  color: #065f46;
}

.delete-btn {
  padding: 0.5rem 1rem;
  background-color: #ef4444;
  color: #fff;
  border: none;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
}

.delete-btn:hover {
  background-color: #dc2626;
}

/* 分页 */
.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 1rem 0;
}

.page-btn {
  padding: 0.5rem 1rem;
  background-color: #fff;
  color: #374151;
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.page-btn:hover:not(:disabled) {
  background-color: #f3f4f6;
  border-color: #d1d5db;
}

.page-btn:disabled {
  background-color: #f9fafb;
  color: #9ca3af;
  border-color: #e5e7eb;
  cursor: not-allowed;
}

.page-info {
  font-size: 0.875rem;
  color: #6b7280;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .container {
    padding: 1rem;
  }
  
  .search-bar {
    flex-direction: column;
    align-items: stretch;
  }
  
  .search-input {
    max-width: none;
  }
  
  .user-table {
    font-size: 0.875rem;
  }
  
  .user-table th, .user-table td {
    padding: 0.75rem 0.5rem;
  }
  
  .pagination {
    flex-wrap: wrap;
  }
}
</style>