export const routes = [
  {
    path: '/',
    redirect: '/dropTable'
  },
  {
    path: '/dropTable',
    component: () => import('../page/DropTable.vue')
  },
  {
    path: '/modal',
    component: () => import('../page/Modal.vue')
  },
  {
    path: '/menu',
    component: () => import('../page/Menu.vue')
  }
];
