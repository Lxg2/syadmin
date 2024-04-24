import variables from '@/styles/element-variables.scss'
import defaultSettings from '@/settings'

const {
  tagsView,
  fixedHeader,
  sidebarLogo
} = defaultSettings

const state = {
  tagsView: tagsView,
  fixedHeader: fixedHeader,
  sidebarLogo: sidebarLogo
}

export default {
  namespaced: true,
  state,
}
