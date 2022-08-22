import type { App } from 'vue'


export type WithInstall<T> = T & {
  install(app: App): void;
} ;


export const withInstall = <T extends Record<string, any>>(comp: T) =>{
  (comp as WithInstall<T>).install = (app: App): void => {
      app.component(comp.name, comp)
  }

  return (comp as WithInstall<T>)
}
