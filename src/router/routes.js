const routes = [
  {
    path: "/index",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/Index.vue") }],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "*",
    component: () => import("pages/Error404.vue"),
  },
  {
    path: "/",
    component: () => import("pages/login.vue"),
  },
  {
    path: "/register",
    component: () => import("pages/Register.vue"),
  },
  {
    path: "/StatusJOB",
    component: () => import("pages/StatusJOB.vue") ,
  },

  {
    path: "/Home",
    component: () => import("pages/Home.vue") ,
  },
];

export default routes;
