import type { Plugin } from 'vue'
import _Button from "./button/button.vue";
import _Text from "./text/text.vue";
import { withInstall } from '../utils';

export const Button = withInstall(_Button)
export const Text = withInstall(_Text)



type VuePlugin = Plugin & {
  name: string
}

export default [
  Button,
  Text
] as VuePlugin[]

