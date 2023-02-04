import { routes as security } from './bundles/security'

export default [
  {
    path: '/',
    component: () => import('@/layouts/Default.vue'),
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('@/bundles/Home.vue'),
      },
    ],
  },
  ...security,
]
