import { createApp } from 'vue';
import App from './App.vue';
import { ElButton, ElInput, ElTable, ElTableColumn, ElCollapseTransition, ElSelect, ElOption } from 'element-plus';
import 'element-plus/packages/theme-chalk/src/base.scss';
import './styles/element-variables.scss';
import router from './router';
import { LyDroptable } from './components';

const elComponents = [ElButton, ElInput, ElTable, ElTableColumn, ElCollapseTransition, ElSelect, ElOption, LyDroptable];

const app = createApp(App);

app.config.globalProperties.$ELEMENT = { size: 'mini', zIndex: 3000 };

elComponents.forEach((component) => {
  app.component(component.name, component);
});

app.use(router);

app.mount('#app');
