import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    redirect: "/main",
  },
  {
    path: "/main",
    name: "main",
    component: () => import("../views/main/main.vue"),
    children: [
      {
        path: "/main/home",
        name: "home",
        component: () => import("../views/main/home/home.vue"),
      },
      {
        path: "/main/personnelMan",
        name: "personnelMan",
        component: () => import("../views/main/personnelMan/personnelMan.vue"),
      },
      {
        path: "/main/personnelMan/:group",
        name: "personnelMans",
        component: () => import("../views/main/personnelMan/personnelMan.vue"),
      },
      {
        path: "/main/appraisalMan",
        name: "appraisalMan",
        component: () => import("../views/main/appraisalMan/appraisalMan.vue"),
      },
      
      {
        path: "/main/show",
        name: "setShow",
        component: () => import("../views/main/set/setShow/setShow.vue"),
      },
      {
        path: "/main/annouce",
        name: "annouce",
        component: () => import("../views/main/set/annouce/announce.vue"),
      },
      {
        path: "/main/annouce/create",
        name: "createAnn",
        component: () => import("../views/main/set/annouce/createAnn.vue"),
      },
      {
        path: "/main/accMan",
        name: "accMan",
        component: () => import("../views/main/accMan/accMans.vue"),
      },
      {
        path: "/main/annouce/detail/:id",
        name: "deatilAnn",
        component: () => import("../views/main/set/annouce/detailAnn.vue"),
      },
      {
        path: "/main/set",
        name: "set",
        component: () => import("../views/main/set/set.vue"),
      },
      {
        path: "/main/infoView",
        name: "infoViewBasic", 
        component: () => import("../views/main/personnelMan/personnelDetails/infoView.vue"),
      },
      {
        path: "/main/infoView/:index", 
        name: "infoViewWithIndex", 
        component: () => import("../views/main/personnelMan/personnelDetails/infoView.vue"),
        props: true 
      },
      {
        path: '/main/infoView/:index',
        name: 'infoView',
        component: () => import('../views/main/personnelMan/personnelDetails/infoView.vue'),
        props: true
      },
      {
        path: '/main/contentEdit',
        name: 'contentEdit',
        component: () => import('../views/main/appraisalMan/contentEdit.vue'),
        props: true
      },
      {
        path: '/main/contentEdit1',
        name: 'contentEdit1',
        component: () => import('../views/main/appraisalMan/contentEdit1.vue'),
        props: true
      },

    ],
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/login/login.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// 导航守卫
router.beforeEach((to, from) => {
  if (to.path === "/main") {
    const token = localStorage.getItem("token");
    console.log("导航守卫判断", token);
    if (token) {
      return "/main/home";
      console.log("用户已经登录");
    } else {
      return "/login";
    }
  }
});

export default router;
