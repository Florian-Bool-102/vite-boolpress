import { createRouter, createWebHistory } from "vue-router";

// importiamo le pagine un po' come facciamo con i controller in Laravel
import HomePage from "./pages/Home.vue";
import AboutPage from "./pages/About.vue";
import BlogPage from "./pages/Blog.vue";
import BlogShowPage from "./pages/BlogShow.vue";
import ContactsPage from "./pages/Contacts.vue";
import NotFoundPage from "./pages/NotFound.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomePage,
  },
  {
    path: "/about",
    name: "about",
    component: AboutPage,
  },
  {
    path: "/blog",
    name: "blog",
    component: BlogPage,
  },
  {
    path: "/blog/:slug",
    name: "blog.show",
    component: BlogShowPage,
  },
  {
    path: "/contatti",
    name: "contacts",
    component: ContactsPage,
  },
  {
    path: "/login",
    name: "login",
    beforeEnter(to, from, next) {
      window.location.href = import.meta.env.VITE_API_URL + "/login";
    },
  },
  {
    "path": "/:pathMatch(.*)*",
    "name": "not-found",
    "component": NotFoundPage
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export { router };
