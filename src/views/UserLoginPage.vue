<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { userLogin } from '../api/userController'
import { useUserStore } from '../stores/user'

const router = useRouter()
const userStore = useUserStore()

// 登录表单数据
const loginForm = reactive({
  userAccount: '',
  userPassword: ''
})

// 错误信息
const errorMessage = ref('')

// 加载状态
const loading = ref(false)

// 登录处理
const handleLogin = async () => {
  // 表单验证
  if (!loginForm.userAccount || !loginForm.userPassword) {
    errorMessage.value = '请填写完整的登录信息'
    return
  }

  loading.value = true
  errorMessage.value = ''

  try {
    const result = await userLogin(loginForm)
    
    // 检查响应数据中的code
    if (result.data.code === 0 && result.data.data) {
      // 登录成功，保存用户信息到Pinia存储
      const userData = result.data.data
      userStore.setUserInfo(userData, '')
      // 跳转到首页
      router.push('/')
    } else {
      // 登录失败
      errorMessage.value = result.data.message || '登录失败，请检查账号密码'
    }
  } catch (error) {
    errorMessage.value = '网络错误，请稍后重试'
    console.error('登录失败:', error)
  } finally {
    loading.value = false
  }
}

// 跳转到注册页面
const goToRegister = () => {
  router.push('/user/register')
}
</script>

<template>
  <div class="login-container">
    <!-- 顶部导航 -->
    <header class="top-header">
      <div class="header-content">
        <div class="logo">
          <span class="logo-icon">🐱</span>
          <span class="logo-text">NoCode</span>
        </div>
      </div>
    </header>

    <!-- 登录表单区域 -->
    <section class="login-section">
      <div class="login-wrapper">
        <div class="login-card">
          <h2 class="login-title">登录</h2>
          <p class="login-subtitle">欢迎回来，请登录您的账户</p>

          <!-- 错误提示 -->
          <div v-if="errorMessage" class="error-message">
            {{ errorMessage }}
          </div>

          <form @submit.prevent="handleLogin" class="login-form">
            <div class="form-group">
              <label for="userAccount" class="form-label">账号</label>
              <input
                id="userAccount"
                v-model="loginForm.userAccount"
                type="text"
                class="form-input"
                placeholder="请输入账号"
                required
              />
            </div>

            <div class="form-group">
              <label for="userPassword" class="form-label">密码</label>
              <input
                id="userPassword"
                v-model="loginForm.userPassword"
                type="password"
                class="form-input"
                placeholder="请输入密码"
                required
              />
            </div>

            <button
              type="submit"
              class="login-btn"
              :disabled="loading"
            >
              <span v-if="loading">登录中...</span>
              <span v-else>登录</span>
            </button>
          </form>

          <div class="register-link">
            还没有账号？
            <a href="#" @click.prevent="goToRegister" class="link">立即注册</a>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.login-container {
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
}

.logo-icon {
  font-size: 1.8rem;
}

/* 登录表单区域 */
.login-section {
  padding: 4rem 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-wrapper {
  max-width: 400px;
  width: 100%;
}

.login-card {
  background-color: #fff;
  border-radius: 1rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  padding: 2rem;
}

.login-title {
  font-size: 1.75rem;
  font-weight: bold;
  color: #111827;
  margin-bottom: 0.5rem;
}

.login-subtitle {
  font-size: 1rem;
  color: #6b7280;
  margin-bottom: 2rem;
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

/* 表单样式 */
.login-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-label {
  font-size: 0.95rem;
  font-weight: 500;
  color: #374151;
}

.form-input {
  padding: 0.75rem 1rem;
  border: 2px solid #e5e7eb;
  border-radius: 0.5rem;
  font-size: 1rem;
  transition: border-color 0.2s;
  outline: none;
}

.form-input:focus {
  border-color: #10b981;
}

/* 登录按钮 */
.login-btn {
  padding: 0.75rem 1rem;
  background-color: #111827;
  color: #fff;
  border: none;
  border-radius: 0.5rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
  margin-top: 1rem;
}

.login-btn:hover:not(:disabled) {
  background-color: #374151;
}

.login-btn:disabled {
  background-color: #9ca3af;
  cursor: not-allowed;
}

/* 注册链接 */
.register-link {
  margin-top: 1.5rem;
  text-align: center;
  font-size: 0.95rem;
  color: #6b7280;
}

.link {
  color: #10b981;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s;
}

.link:hover {
  color: #059669;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .login-card {
    padding: 1.5rem;
  }

  .login-title {
    font-size: 1.5rem;
  }
}
</style>