import { createApp } from 'vue';
import App from './App.vue';
import { ElButton, ElInput, ElTable, ElTableColumn, ElCollapseTransition } from 'element-plus';
import 'element-plus/packages/theme-chalk/src/base.scss';
import './styles/element-variables.scss';

//按需加载el-ui
const elComponents = [ElButton, ElInput, ElTable, ElTableColumn, ElCollapseTransition];
// const elPlugins = [ElMessage];

const app = createApp(App);

//设置ui全局配置, size:ui 尺寸, zIndex:弹框默认z-index
app.config.globalProperties.$ELEMENT = { size: 'mini', zIndex: 3000 };

elComponents.forEach((component) => {
  app.component(component.name, component); // 或者 app.use(component)
});
// elPlugins.forEach((plugin) => {
//   app.use(plugin);
// });

app.mount('#app');
