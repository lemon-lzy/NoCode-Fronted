import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

// 定义用户信息类型
interface UserInfo {
  id?: number;
  userAccount?: string;
  userAvatar?: string;
  userName?: string;
  [key: string]: any;
}

export const useUserStore = defineStore('user', () => {
  // 用户信息
  const userInfo = ref<UserInfo | null>(null)
  // 登录状态
  const isLoggedIn = computed(() => !!userInfo.value)
  // 访问令牌
  const token = ref<string>('')

  // 设置用户信息
  function setUserInfo(user: UserInfo, userToken: string) {
    userInfo.value = user
    token.value = userToken
    // 保存到localStorage
    localStorage.setItem('userInfo', JSON.stringify(user))
    localStorage.setItem('token', userToken)
  }

  // 清除用户信息
  function clearUserInfo() {
    userInfo.value = null
    token.value = ''
    // 从localStorage清除
    localStorage.removeItem('userInfo')
    localStorage.removeItem('token')
  }

  // 获取用户头像（如果没有则返回默认头像）
  const userAvatar = computed(() => {
    if (!userInfo.value) return ''
    return userInfo.value.userAvatar || 'https://picsum.photos/seed/useravatar/100/100'
  })

  // 获取用户名（如果没有则使用账号）
  const userName = computed(() => {
    if (!userInfo.value) return ''
    return userInfo.value.userName || userInfo.value.userAccount
  })

  // 初始化时从localStorage恢复用户信息
  function initUserInfo() {
    const savedUserInfo = localStorage.getItem('userInfo')
    const savedToken = localStorage.getItem('token')
    if (savedUserInfo && savedToken) {
      try {
        userInfo.value = JSON.parse(savedUserInfo)
        token.value = savedToken
      } catch (error) {
        console.error('Failed to parse user info from localStorage:', error)
        clearUserInfo()
      }
    }
  }

  return {
    userInfo,
    isLoggedIn,
    token,
    userAvatar,
    userName,
    setUserInfo,
    clearUserInfo,
    initUserInfo
  }
})