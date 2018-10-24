import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/pages/index'
import AddAddress from '@/pages/addressManage/AddAddress'
import SelectAddress from '@/pages/addressManage/SelectAddress'
import RecordDetail from '@/pages/askManage/RecordDetail'
import AskRecord from '@/pages/askManage/AskRecord'
import Progress from '@/pages/progress/index'
import FillInfo from '@/pages/progress/FillInfo'
import TransType from '@/pages/progress/TransType'
import CopyContent from '@/pages/progress/CopyContent'
import InfoConfirm from '@/pages/progress/InfoConfirm'
import Submit from '@/pages/progress/Submit'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/:loginName',
      name: 'Index',
      component: Index,
    },
    {
      path: '/addAddress',
      name: 'AddAddress',
      component: AddAddress
    },
    {
      path: '/selectAddress',
      name: 'SelectAddress',
      component: SelectAddress
    },
    {
      path: '/askRecord',
      name: 'AskRecord',
      component: AskRecord
    },
    {
      path: '/recordDetail',
      name: 'RecordDetail',
      component: RecordDetail
    },
    {
      path: '/submit',
      name: 'Submit',
      component: Submit
    },
    {
      path: '/progress',
      name: 'Progress',
      component: Progress,
      children: [
        {
          path: '/fillInfo',
          name: 'FillInfo',
          component: FillInfo
        },
        {
          path: '/transType',
          name: 'TransType',
          component: TransType
        },
        {
          path: '/copyContent',
          name: 'CopyContent',
          component: CopyContent
        },
        {
          path: '/infoConfirm',
          name: 'InfoConfirm',
          component: InfoConfirm
        }
      ]
    }
  ]
})
