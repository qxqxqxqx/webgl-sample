import Layout from '@V/layout/Layout.vue';

const routes = [
  {
    path: '/',
    component: Layout,
    redirect: '/helloPoint',
    children: [
      {
        path: '/helloPoint',
        name: 'helloPoint',
        component: () => import('@V/HelloPoint.vue'),
      },
      {
        path: '/helloPoint2',
        name: 'helloPoint2',
        component: () => import('@V/HelloPoint2.vue'),
      },
      {
        path: '/clickedPoints',
        name: 'clickedPoints',
        component: () => import('@V/ClickedPoints.vue'),
      },
      {
        path: '/coloredPoints',
        name: 'coloredPoints',
        component: () => import('@V/ColoredPoints.vue'),
      }
    ],
  },
];

export default routes;