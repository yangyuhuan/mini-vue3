import {createRouter, createWebHistory} from 'vue-router'

//配置映射关系
const routes = [
    {
        path: '/',
        redirect:'/home'
    },
    {
        path: '/home',
        name: 'home',
        component: () => import("../pages/Home.vue"),
        mate:{
            name: 'why',
            age: 18,
            height: 1.88
        },
        children:[
            {
                path:'',
                redirect:'/home/message',
            },
            {
                path:'massage',
                component: () => import("../pages/HomeMessage.vue"),
            },
            {
                path: 'shops',
                component: () => import("../pages/HomeShops.vue")
            }
        ]
    },
    { 
        path: "/about",
        name: "about",
        component: () => import("../pages/About.vue") 
      },
      { 
        path: "/user/:username/id/:id",
        component: () => import("../pages/User.vue") 
      },
      {
        path: "/login",
        component: () => import("../pages/Login.vue")
      },
      {
        path: "/:pathMatch(.*)",
        component: () => import("../pages/NotFound.vue")
      }
]

const router = createRouter({
    routes,
    history: createWebHistory()
})

//动态添加路由
const categoryRoute = {
    path: '/category',
    component: () => import("../pages/Category.vue")
}

router.addRoute(categoryRoute)

router.addRoute("home", {
    path:"moment",
    component: () => import("../pages/HomeMoment.vue")
})

//导航守卫beforeEach
let counter = 0
//to: route对象，即将跳转到Route对象
//from: Route对象
/**
 * 返回值问题:
 *    1.false: 不进行导航
 *    2.undefined或者不写返回值: 进行默认导航
 *    3.字符串: 路径, 跳转到对应的路径中
 *    4.对象: 类似于 router.push({path: "/login", query: ....})
 */
router.beforeEach((to,from) => {
    console.log(`进行了${++counter}路由跳转`)
    console.log(from)
    if (to.path !== "/login") {
        const token = window.localStorage.getItem("token");
        if (!token) {
          return "/login"
        }
      }

})

export default router
