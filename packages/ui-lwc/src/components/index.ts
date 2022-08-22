import type { App } from 'vue'
export *  from './exportComps'
import components from './importComps'


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