<template>
  <div class="login-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" title="登录" />
    <!-- 登录表单 -->
    <van-form ref="loginForm" @submit="onSubmit">
      <!-- 手机号表单 -->
      <van-field v-model="user.mobile" name="mobile" placeholder="请输入手机号"
      :rules="userFormRules.mobile" type="number" maxlength="11">
        <!-- 字体图标 -->
        <i slot="left-icon" class="toutiao toutiao-shouji"></i>
      </van-field>
      <!-- 验证码表单 -->
      <van-field v-model="user.code" name="code" placeholder="请输入验证码"
      :rules="userFormRules.code" type="number" maxlength="6">
        <!-- 字体图标 -->
        <i slot="left-icon" class="toutiao toutiao-yanzhengma"></i>
        <!-- 验证码图标 -->
        <template #button>
          <van-count-down v-if="isCountDownShow" :time="1000 * 60"
                          format="ss S" @finish="isCountDownShow = false">
            <template #default="timeData">
              <span class="block">{{ timeData.seconds }} S</span>
            </template>
          </van-count-down>
          <van-button v-else class="send-sms-btn" round size="small"
                      type="default" native-type="button" @click="onSendSms">获取验证码</van-button>
        </template>
      </van-field>
      <!-- 登录按钮 -->
      <div class="login-btn-wrap">
        <van-button class="login-btn" block type="info" native-type="submit">登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { login, sendSms } from '@/api/user'
export default {
  name: 'LoginIndex',
  data () {
    return {
      user: {
        mobile: '13911111111', // 手机号
        code: '246810' // 验证码
      },
      userFormRules: {
        mobile: [
          { required: true, message: '手机号不能为空' },
          { pattern: /^1[3456789]\d{9}$/, message: '手机号格式错误' }
        ],
        code: [
          { required: true, message: '验证码不能为空' },
          { pattern: /^\d{6}$/, message: '验证码格式错误' }
        ]
      },
      isCountDownShow: false // 是否展示倒计时
    }
  },
  methods: {
    /**
     * 登录
     */
    async onSubmit () {
      // 1.获取表单数据
      const user = this.user
      // 2.表单验证

      // 在组件中必须通过 this.$toast 来调用组件
      this.$toast.loading({
        message: '登录中...',
        forbidClick: true, // 禁用背景点击
        duration: 0 // 持续时间，默认是2000，如果为 0 则持续展示
      })
      // 3.提交表单请求登录
      try {
        const { data } = await login(user)
        this.$store.commit('setUser', data.data)
        this.$toast.success('登录成功')
      } catch (err) {
        if (err.response.status === 400) {
          this.$toast.fail('手机号或验证码不正确')
        } else {
          this.$toast.fail('登录失败，请稍后重试')
        }
      }
      // 4.根据请求响应结果处理后续操作
    },
    /**
     * 发送验证码
     */
    async onSendSms () {
      // 1.校验手机号
      try {
        await this.$refs.loginForm.validate('mobile')
        console.log('验证通过')
      } catch (err) {
        return console.log('验证失败', err)
      }

      // 2.验证通过，显示倒计时
      this.isCountDownShow = true
      // 3.请求发送验证码
      try {
        await sendSms(this.user.mobile)
        this.$toast.success('发送成功')
      } catch (err) {
        this.isCountDownShow = false
        if (err.response.status === 429) {
          this.$toast.fail('操作太频繁，请稍后重试')
        } else {
          this.$toast.fail('发送失败，请稍后重试')
        }
      }
    }
  }

}
</script>

<style scoped lang="less">
.login-container {
  .toutiao {
    font-size: 37px;
  }

  .send-sms-btn {
    width: 152px;
    height: 46px;
    line-height: 46px;
    background-color: #ededed;
    font-size: 22px;
    color: #666;
    display: block;
  }

  .login-btn-wrap {
    padding: 53px 33px;
    .login-btn {
      background-color: #6db4fb;
      border: none;
    }
  }

  .block {
    display: block;
    width: 152px;
    height: 46px;
    line-height: 46px;
    font-size: 22px;
    color: #666;
    text-align: center;
    background-color: #ededed;
    border-radius: 23px;
  }
}
</style>
