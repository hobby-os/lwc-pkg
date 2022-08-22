<template>
  <button
    :class="msg"
    
   
    @click="handleClick"
  >
    <template v-if="loading">
      <slot v-if="$slots.loading" name="loading" />
      <el-icon :class="cc" v-else >
        <component :is="loadingIcon" />
      </el-icon>
    </template>
    <el-icon v-else-if="icon || $slots.icon">
      <component :is="icon" v-if="icon" />
      <slot v-else name="icon" />
    </el-icon>
    <span
      v-if="$slots.default"
      :class="{ [ns.em('text', 'expand')]: shouldAddSpace }"
    >
      <slot />
    </span>
  </button>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

import {aa} from './button'

const msg: string = 'Hello World!';

let cc:any = ref(0)

const handleClick = (evt: MouseEvent) => {
  aa()
}

</script>
