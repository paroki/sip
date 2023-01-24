import {ROLE_ADMIN} from "~/lib/config"

export const nav = [
  {
    title: 'Dashboard',
    to: '/',
    icon: 'cil-home'
  },
  /* Sakramen */
  {
    title: 'Sakramen',
    icon: 'cil-badge',
    items: [
      {
        title: 'Baptis',
        to: '/sakramen/baptis',
      },
      {
        title: 'Komuni',
        to: '/sakramen/komuni',
      },
      {
        title: 'Krisma',
        to: '/sakramen/krisma',
      }
    ],
  },
  {
    title: 'Konfigurasi',
    icon: 'cil-cog',
    role: ROLE_ADMIN,
    items: [
      {
        title: 'User',
        to: '/setting/user',
        icon: 'cil-people',
        role: ROLE_ADMIN
      },
    ],
  },
  {
    title: 'Logout',
    icon: 'cil-account-logout',
    to: '/logout'
  }
]

export default nav
