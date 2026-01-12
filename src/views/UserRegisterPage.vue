<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { userRegister } from '../api/userController'

const router = useRouter()

// 注册表单数据
const registerForm = reactive({
  userAccount: '',
  userPassword: '',
  checkPassword: ''
})

// 错误信息
const errorMessage = ref('')

// 加载状态
const loading = ref(false)

// 注册处理
const handleRegister = async () => {
  // 表单验证
  if (!registerForm.userAccount || !registerForm.userPassword || !registerForm.checkPassword) {
    errorMessage.value = '请填写完整的注册信息'
    return
  }

  if (registerForm.userPassword !== registerForm.checkPassword) {
    errorMessage.value = '两次输入的密码不一致'
    return
  }

  if (registerForm.userPassword.length < 6) {
    errorMessage.value = '密码长度不能少于6位'
    return
  }

  loading.value = true
  errorMessage.value = ''

  try {
    const result = await userRegister(registerForm)

    if (result.data.code === 0) {
      // 注册成功
      alert('注册成功，请登录')
      // 跳转到登录页面
      router.push('/user/login')
    } else {
      // 注册失败
      errorMessage.value = result.data.message || '注册失败，请稍后重试'
    }
  } catch (error) {
    errorMessage.value = '网络错误，请稍后重试'
    console.error('注册失败:', error)
  } finally {
    loading.value = false
  }
}

// 跳转到登录页面
const goToLogin = () => {
  router.push('/user/login')
}
</script>

<template>
  <div class="register-container">
    <!-- 顶部导航 -->
    <header class="top-header">
      <div class="header-content">
        <div class="logo">
          <span class="logo-icon">🐱</span>
          <span class="logo-text">NoCode</span>
        </div>
      </div>
    </header>

    <!-- 注册表单区域 -->
    <section class="register-section">
      <div class="register-wrapper">
        <div class="register-card">
          <h2 class="register-title">注册</h2>
          <p class="register-subtitle">创建您的NoCode账户，开始使用</p>

          <!-- 错误提示 -->
          <div v-if="errorMessage" class="error-message">
            {{ errorMessage }}
          </div>

          <form @submit.prevent="handleRegister" class="register-form">
            <div class="form-group">
              <label for="userAccount" class="form-label">账号</label>
              <input
                id="userAccount"
                v-model="registerForm.userAccount"
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
                v-model="registerForm.userPassword"
                type="password"
                class="form-input"
                placeholder="请输入密码（至少6位）"
                required
                minlength="6"
              />
            </div>

            <div class="form-group">
              <label for="checkPassword" class="form-label">确认密码</label>
              <input
                id="checkPassword"
                v-model="registerForm.checkPassword"
                type="password"
                class="form-input"
                placeholder="请再次输入密码"
                required
              />
            </div>

            <button
              type="submit"
              class="register-btn"
              :disabled="loading"
            >
              <span v-if="loading">注册中...</span>
              <span v-else>注册</span>
            </button>
          </form>

          <div class="login-link">
            已有账号？
            <a href="#" @click.prevent="goToLogin" class="link">立即登录</a>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.register-container {
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

/* 注册表单区域 */
.register-section {
  padding: 4rem 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.register-wrapper {
  max-width: 400px;
  width: 100%;
}

.register-card {
  background-color: #fff;
  border-radius: 1rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  padding: 2rem;
}

.register-title {
  font-size: 1.75rem;
  font-weight: bold;
  color: #111827;
  margin-bottom: 0.5rem;
}

.register-subtitle {
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
.register-form {
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

/* 注册按钮 */
.register-btn {
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

.register-btn:hover:not(:disabled) {
  background-color: #374151;
}

.register-btn:disabled {
  background-color: #9ca3af;
  cursor: not-allowed;
}

/* 登录链接 */
.login-link {
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
  .register-card {
    padding: 1.5rem;
  }

  .register-title {
    font-size: 1.5rem;
  }
}
</style>