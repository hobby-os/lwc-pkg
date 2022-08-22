import type { Plugin } from 'vue'
import { Button } from "./button";
import { Text } from "./text";


type VuePlugin = Plugin & {
  name: string
}

export default [
  Button,
  Text
] as VuePlugin[]

