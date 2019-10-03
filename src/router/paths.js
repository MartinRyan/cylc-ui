/* jshint esversion: 6, asi: true */
import i18n from '@/i18n'

/**
 * Define all of your application routes here
 * for more information on routes, see the
 * official documentation https://router.vuejs.org/en/
 */
export default [
  {
    path: '/',
    view: 'Dashboard',
    name: i18n.t('App.dashboard'),
    meta: {
      layout: 'default'
    }
  },
  {
    path: '/graph/:workflowid',
    view: 'Graph',
    name: i18n.t('App.graph'),
    meta: {
      layout: 'default'
    },
    props: true
  },
  {
    path: '/network/:workflowid',
    view: 'Network',
    name: i18n.t('App.network'),
    meta: {
      layout: 'default'
    },
    props: true
  },
  {
    path: '/sigma/:workflowid',
    view: 'Sigma',
    name: i18n.t('App.sigma'),
    meta: {
      layout: 'default'
    },
    props: true
  },
  {
    path: '/d3dagre/:workflowid',
    view: 'D3Dagre',
    name: i18n.t('App.d3dagre'),
    meta: {
      layout: 'default'
    },
    props: true
  },
  {
    path: '/elgrapho/:workflowid',
    view: 'Elgrapho',
    name: i18n.t('App.elgrapho'),
    meta: {
      layout: 'default'
    },
    props: true
  },
  {
    path: '/workflows',
    name: i18n.t('App.workflows'),
    view: 'GScan',
    meta: {
      layout: 'default'
    }
  },
  {
    path: '/workflows/:name',
    view: 'Tree',
    meta: {
      layout: 'default'
    }
  },
  {
    path: '/user-profile',
    name: i18n.t('App.userProfile'),
    view: 'UserProfile',
    meta: {
      layout: 'default'
    }
  },
  {
    path: '*',
    view: 'NotFound',
    meta: {
      layout: 'empty'
    }
  }
]
