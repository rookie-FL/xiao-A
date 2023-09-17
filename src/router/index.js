import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    redirect: "/main",
  },
  {
    meta:{title:'首页'},
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
        meta: { title: "人员管理", show: true },
        path: "/main/personnelMan",
        name: "personnelMan",
<<<<<<< HEAD
        component: () =>
          import("../views/main/personnelMan/personnelMan.vue"),
        children: [
          {
            meta: { title: "人员详情", show: false },
            path: "/main/infoView/:index",
            name: "infoView",
            component: () =>
              import(
                "../views/main/personnelMan/personnelDetails/infoView.vue"
              ),
            props: true,
          },
        ],
      },
      {
        meta: { title: "人员管理", show: true },
        path: "/main/personnelMan/:group",
        name: "personnelMans",
        component: () =>
          import("../views/main/personnelMan/personnelMan.vue"),
        children: [
          {
            meta: { title: "人员详情", show: false },
            path: "/main/infoView/:index",
            name: "infoView",
            component: () =>
              import(
                "../views/main/personnelMan/personnelDetails/infoView.vue"
              ),
            props: true,
          },
        ],
      },
      {
        path: "/main/personnelMan/:id",
        name: "InfoView",
        component: () =>
          import("../views/main/personnelMan/personnelMan.vue"),
      },
      {
        meta: { title: "考核管理" },
=======
        component: () => import("../views/main/personnelMan/personnelMan.vue"),
        children:[{
          meta:{title:'人员详情',show:false},
          path: "/main/infoView",
          name: "infoViewBasic", 
          component: () => import("../views/main/personnelMan/personnelDetails/infoView.vue"),
        },
        {
          meta:{title:'人员详情',show:false},
          path: "/main/infoView/:index", 
          name: "infoViewWithIndex", 
          component: () => import("../views/main/personnelMan/personnelDetails/infoView.vue"),
          props: true 
        },
        {
          meta:{title:'人员详情',show:false},
          meta:{title:'人员详情'},
          path: '/main/infoView/:id',
          name: 'infoView',
          component: () => import('../views/main/personnelMan/personnelDetails/infoView.vue'),
          props: true
        },]
      },
      {
        meta:{title:'考核管理'},
>>>>>>> 89d657e809083d8b39d2f8824ce56a593dac74cd
        path: "/main/appraisalMan",
        name: "appraisalMan",
        component: () => import("../views/main/appraisalMan/appraisalMan.vue"),
      },
      {
        meta: { title: "展示设置/展示内容编辑" },
        path: "/main/show",
        name: "setShow",
        component: () => import("../views/main/set/setShow/setShow.vue"),
      },
      {
        meta: { title: "公告设置/通知公告管理", show: true },
        path: "/main/annouce",
        name: "annouce",
        component: () => import("../views/main/set/annouce/announce.vue"),
        children: [
          {
            meta: { title: "通知公告编辑", show: false },
            path: "/main/annouce/create",
            name: "createAnn",
            component: () =>
              import("../views/main/set/annouce/createAnn.vue"),
          },
        ],
      },
      {
        path: "/main/accMan",
        name: "accMan",
        component: () => import("../views/main/accMan/accMans.vue"),
      },
      {
        meta: { title: "公告设置/公告详情" },
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
        path: "/main/set/infoSet",
        name: "inforSet",
        component: () => import("../views/main/set/infoSet.vue"),
      },
      {
        meta: { title: "组别介绍编辑" },
        path: "/main/set/infoEdit/:group",
        name: "inforEdit",
        component: () => import("../views/main/set/infoEdit.vue"),
      },
<<<<<<< HEAD
      {
        path: "/main/infoView",
        name: "infoViewBasic",
        component: () =>
          import("../views/main/personnelMan/personnelDetails/infoView.vue"),
      },
      {
<<<<<<< HEAD
        path: "/main/infoView/:index",
        name: "infoViewWithIndex",
        component: () =>
          import("../views/main/personnelMan/personnelDetails/infoView.vue"),
        props: true,
      },
      {
        meta: { title: "人员详情" },
        path: "/main/infoView/:id",
        name: "infoView",
        component: () =>
          import("../views/main/personnelMan/personnelDetails/infoView.vue"),
        props: true,
      },
=======
      //移到上面了
      // {
      //   path: "/main/infoView",
      //   name: "infoViewBasic", 
      //   component: () => import("../views/main/personnelMan/personnelDetails/infoView.vue"),
      // },
      // {
      //   path: "/main/infoView/:index", 
      //   name: "infoViewWithIndex", 
      //   component: () => import("../views/main/personnelMan/personnelDetails/infoView.vue"),
      //   props: true 
      // },
      // {
      //   meta:{title:'人员详情'},
      //   path: '/main/infoView/:id',
      //   name: 'infoView',
      //   component: () => import('../views/main/personnelMan/personnelDetails/infoView.vue'),
      //   props: true
      // },
>>>>>>> 89d657e809083d8b39d2f8824ce56a593dac74cd
      {
        meta: { title: "考核内容编辑" },
        path: "/main/contentEdit",
        name: "contentEdit",
        component: () => import("../views/main/appraisalMan/contentEdit.vue"),
        props: true,
=======
        meta:{title:'人员详情'},
        path: '/main/infoView/:index',
        name: 'infoView',
        component: () => import('../views/main/personnelMan/personnelDetails/infoView.vue'),
        props: true
>>>>>>> b6cdb5a (2023.9.17)
      },
      {
        path: "/main/contentEdit1",
        name: "contentEdit1",
        component: () => import("../views/main/appraisalMan/contentEdit1.vue"),
        props: true,
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

