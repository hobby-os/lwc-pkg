import type { App } from 'vue'
import  components from './components'


const version = "3.5.2";
function install(app: App) {
  components.forEach((item) => {
    if (item.install) {
      app.use(item);
    } else if (item.name) {
      app.component(item.name, item);
    }
  });
}

export default {
    version,
    install
}