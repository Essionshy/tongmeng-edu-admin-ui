const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  roles: state => state.user.roles,
  //新增用户下面的按钮
  buttons: state => state.user.buttons,
  // 定义权限菜单路由
  routes: state => state.permission.routes,
  addRoutes: state => state.permission.addRoutes
}
export default getters
