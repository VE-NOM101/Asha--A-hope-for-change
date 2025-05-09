import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Layout from '@/layouts/Layout.vue'
import CreateCampaign from '@/views/CreateCampaign.vue'
import Dashboard from '@/views/Dashboard.vue'
import DetailView from '@/views/DetailView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Layout,
      children: [
        { name: 'homeView', path: '', component: HomeView },
        { name: 'detailView', path: '/detail-view/:campaign_address', component: DetailView },
        { name: 'createCampaignView', path: '/create-campaign', component: CreateCampaign },
        { name: 'dashboard', path: '/dashboard', component: Dashboard },
      ],
    },
  ],
})

export default router
