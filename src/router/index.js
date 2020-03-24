
const Home = () => import('views/home/home')
const Category = () => import('views/category/category')
const Market = () => import('views/market/market')
const Profile = () => import('views/profile/profile')
const Detail = () => import('views/detail/detail')


Vue.use(VueRouter)

const routes = [
    {
        path:'/',
        redirect:'/home'
    },
    {
        path: '/home',
        component: Home,
        meta:{index:0}
    },
    {
        path: '/category',
        component: Category,
        meta:{index:1}
    },
    {
        path: '/market',
        component: Market,
        meta:{index:2,requireAuth:true}
    },
    {
        path: '/profile',
        component: Profile,
        meta:{index:3}
    },
    {
        path: '/detail/:iid',
        component: Detail,
        meta: {index: 4}   
    },
]

const router= new VueRouter({
    mode:'history',
    routes
})

router.beforeEach((to,from,next)=>{
    if(to.meta.requireAuth){   //如果需要验证  就进行验证
        if(localStorage.getItem('products')){   //如果获取到了数据
            next()
        }else{//没有通过验证 直接跳转到 home
            next('/home')
        }
    }else{//如果不需要验证 就直接next
        next()
    }
})
export default router
