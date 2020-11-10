import { constantRoutes } from '@/router'
import { getMenu } from '@/api/login'
import Layout from '@/views/layout/Layout'

function filterAsyncRouter(asyncRouterMap) { // 遍历后台传来的路由字符串，转换为组件对象
 
  try {
    const accessedRouters = asyncRouterMap.filter(route => {
      if (route.component) {
        if (route.component === 'Layout') { // Layout组件特殊处理
         
          route.component = Layout
        } else {
          const component = route.component
          route.component = resolve => {
            require(['@/views' + component + '.vue'], resolve)
          }
        
        }
      }
      //
      if (route.children && route.children.length) {
        route.children = filterAsyncRouter(route.children)
      }


      return true
    })
   
    return accessedRouters

  
  } catch (e) {
    console.log(e)
  }
}



const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    //组合固定路由与动态路由
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  //异步获得菜单数据，是什么时候
  async generateRoutes({ commit }, roles) {
    // 取后台路由
    //调用 @/api/login.js 中的getMenu方法获取菜单数据
    const asyncRouter = await getMenu()
    
    return new Promise(resolve => {
      //定义一个临时变量tmp接收后台查询出该用户拥有的权限菜单列表
      const tmp = asyncRouter.data.permissionList
      console.log(" this is temp")
      console.log(tmp)
      //将用户的权限列表与动态路由中默认项作匹配过滤
      const accessedRoutes = filterAsyncRouter(tmp)
      //将用户允许被访问的菜单项保存
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
