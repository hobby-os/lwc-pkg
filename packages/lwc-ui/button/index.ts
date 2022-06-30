import { App } from 'vue';
import _Button from './src/Button';


export const Button = withInstall(_Button);
export default Button;

type WithInstall<T> = T & {
    install(app: App): void;
  }


function withInstall<T>(options: T) {
    (options as Record<string, unknown>).install = (app: App) => {
      const { name } = options as unknown as { name: string };
      app.component(name, options);
    };
  
    return options as WithInstall<T>;
  }