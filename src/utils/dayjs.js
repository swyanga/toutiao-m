import Vue from 'vue'
import dayjs from 'dayjs'
// 加载中文语言包
import 'dayjs/locale/zh-cn'

import relativeTime from 'dayjs/plugin/relativeTime'

// 配置使用处理相对时间的插件
dayjs.extend(relativeTime)

// dayjs默认语言是英文
dayjs.locale('zh-cn')

// 定义一个全局过滤器，就可以在任何组件中使用了
// 参数一：过滤器名称
// 参数二：过滤器函数
// 使用方式：{{ 表达式 ｜ 过滤器名称}}
// 管道符前面的表达式的结果会作为参数传递到过滤器函数中
// 过滤器的返回值会渲染到使用过滤器的模板位置
Vue.filter('relativeTime', value => {
  return dayjs().to(dayjs(value))
})

// dayjs()获取当前最新时间
// dayjs().format('YYYY-MM-DD')
