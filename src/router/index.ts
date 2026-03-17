import { createRouter, createWebHashHistory } from 'vue-router'


const router = createRouter({
    history: createWebHashHistory(),
    routes: [
		{
			path: '/',
            name: 'index',
			component: () => import('../views/island/index.vue')
		},
		{
			path: '/setting',
			name: 'setting',
			redirect: '/setting/shape',
			component: () => import('../views/setting/index.vue'),
			children: [
				{
					path: 'shape',
					name: 'setting.shape',
					component: () => import('../views/setting/shape.vue')
				},
				{
					path: 'theme',
					name: 'setting.theme',
					component: () => import('../views/setting/theme.vue')
				},
				{
					path: 'lunch',
					name: 'setting.lunch',
					component: () => import('../views/setting/lunch.vue')
				},
			]
		}
    ]
})

router.beforeEach((to, from, next) => {
	return next();
});

router.afterEach((to, from, next) => {
    window.scrollTo({
		top: 0,
		left: 0,
		behavior: 'smooth'
	});
});


export default router
