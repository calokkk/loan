import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
//解决编程式路由往同一地址跳转时会报错的情况
const originalPush = Router.prototype.push;
const originalReplace = Router.prototype.replace;
//push
Router.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject)
    return originalPush.call(this, location, onResolve, onReject);
  return originalPush.call(this, location).catch(err => err);
};
//replace
Router.prototype.replace = function push(location, onResolve, onReject) {
  if (onResolve || onReject)
    return originalReplace.call(this, location, onResolve, onReject);
  return originalReplace.call(this, location).catch(err => err);
};

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      redirect: '/home',
      component: () => import('@/pages/Index/Index'),
      meta:{
        auth:true
      },
      children: [
        // 主页
        {
          path: '/home',
          name: 'Home',
          component: () => import('@/pages/Home/Home'),
          meta:{
            auth:true
          }
        },
        // 贷款页面
        {
          path: '/loan',
          name: 'Loan',
          component: () => import('@/pages/Loan/Loan'),
          meta:{
            auth:true
          }
        },
        //个人信息
        {
          path: '/profile',
          name: 'Profile',
          component: () => import('@/pages/Profile/Profile'),
          meta:{
            auth:true
          }
        },
      ]
    },
    // 登录页面
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/pages/Login/Login'),
    },
    //信息完善进度页面
    {
      path: '/dataProcess',
      name: 'DataProcess',
      component: () => import('@/pages/DataProcess/DataProcess'),
      meta:{
        auth:true
      },
    },
    //点击提现进入的中转页(跳转到大数据)
    {
      path: '/middlePage',
      name: 'MiddlePage',
      component: () => import('@/pages/MiddlePage/MiddlePage'),
      meta:{
        auth:true
      },
    },
    //申请填写信息页面
    {
      path: '/apply',
      name: 'Apply',
      component: () => import('@/pages/ApplicationForm/ApplicationForm'),
      meta:{
        auth:true
      },
    },
    //金额、分期数选择页面
    {
      path: '/qishu',
      name: 'QiShu',
      component: () => import('@/pages/QiShu/QiShu'),
      meta:{
        auth:true
      }
    },
    //外部页面容器
    {
      path: '/bigData',
      name: 'BigData',
      component: () => import('@/pages/BigData/BigData'),
      meta:{
        auth:true
      }
    },
    //进度查询
    {
      path: '/process',
      name: 'Process',
      component: () => import('@/pages/Process/Process'),
      meta:{
        auth:true
      }
    },
  ]
})
