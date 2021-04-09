const routes = [
  {
    path: '/about',
    name: 'About',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/About.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () =>
      import(/* webpackChunkName: "login" */ '../views/Login.vue'),
    meta: {
      guest: true
    }
  },
  {
    path: '/register',
    name: 'register',
    component: () =>
      import(/* webpackChunkName: "register" */ '../views/Registration.vue'),
    meta: {
      guest: true
    }
  },
  {
    path: '/hellouser',
    name: 'hellouser',
    component: () =>
      import(/* webpackChunkName: "hellouser" */ '../views/HelloUser.vue'),
    meta: {
      requiresAuth: true
    },
    children: [
      {
        path: 'orders',
        name: 'userorders',
        component: () =>
          import(
            /* webpackChunkName: "userorders" */ '../components/Shop/Orders.vue'
          )
      },
      {
        path: 'orders/:id',
        name: 'userorder',
        component: () =>
          import(
            /* webpackChunkName: "stufforder" */ '../components/Shop/Order.vue'
          )
      }
    ]
  },
  {
    path: '/catalog',
    name: 'catalog',
    component: () =>
      import(/* webpackChunkName: "catalog" */ '../views/Catalog.vue'),
    meta: {}
  },
  {
    path: '/cart',
    name: 'cart',
    component: () => import(/* webpackChunkName: "cart" */ '../views/Cart.vue'),
    meta: {}
  },
  {
    path: '/stuff/reg',
    name: 'stuffreg',
    component: () =>
      import(
        /* webpackChunkName: "stuffreg" */ '../views/StuffRegistration.vue'
      ),
    meta: {
      guest: true
    }
  },
  {
    path: '/stuff/login',
    name: 'stufflogin',
    component: () =>
      import(/* webpackChunkName: "stufflogin" */ '../views/StuffLogin.vue'),
    meta: {
      guest: true
    }
  },
  {
    path: '/stuff',
    name: 'stuff',
    props: true,
    component: () =>
      import(
        /* webpackChunkName: "stuffaccount" */ '../views/StuffAccount.vue'
      ),
    meta: {
      requiresAuth: true
    },
    children: [
      {
        path: 'orders',
        name: 'stufforders',
        component: () =>
          import(
            /* webpackChunkName: "stufforders" */ '../components/Stuff/Orders.vue'
          )
      },
      {
        path: 'orders/:id',
        name: 'stufforder',
        props: true,
        component: () =>
          import(
            /* webpackChunkName: "stufforder" */ '../components/Stuff/Order.vue'
          )
      },
      {
        path: 'goods',
        name: 'stuffgoods',
        component: () =>
          import(
            /* webpackChunkName: "stuffgoods" */ '../components/Stuff/Goods.vue'
          )
      },
      {
        path: 'goods/:id',
        name: 'stuffgood',
        props: true,
        component: () =>
          import(
            /* webpackChunkName: "stuffgood" */ '../components/Stuff/Good.vue'
          )
      }
    ]
  },
  {
    path: '/owner',
    name: 'owner',
    props: true,
    component: () =>
      import(
        /* webpackChunkName: "owneraccount" */ '../views/OwnerAccount.vue'
      ),
    meta: {
      requiresAuth: true,
      owner: true
    },
    children: [
      {
        path: 'finance',
        name: 'finance',
        props: true,
        component: () =>
          import(
            /* webpackChunkName: "finance" */ '../components/Owner/Finance.vue'
          )
      },
      {
        path: 'employees',
        name: 'employees',
        props: true,
        component: () =>
          import(
            /* webpackChunkName: "employees" */ '../components/Owner/Employees.vue'
          )
      },
      {
        path: 'rating',
        name: 'rating',
        props: true,
        component: () =>
          import(
            /* webpackChunkName: "rating" */ '../components/Owner/Rating.vue'
          )
      }
    ]
  }
]

export default routes
