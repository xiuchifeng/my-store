const requireContext = require.context('./',true,/\.vue$/)

requireContext.keys().forEach(fileName => {
  // 获取组件配置
  const componentConfig = requireContext(fileName)

  Vue.component(
    componentConfig.default.name,
    
    // 如果这个组件选项是通过 `export default` 导出的，
    // 那么就会优先使用 `.default`，
    // 否则回退到使用模块的根。
    componentConfig.default
  )
})