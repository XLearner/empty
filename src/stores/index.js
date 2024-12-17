import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { apiGetBaseInfo } from '@/api/api'

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }

  return { count, doubleCount, increment }
})

export const useBaseInfoStore = defineStore('baseInfo', () => {
  const baseInfo = ref({})

  function refresh() {
    console.log(2);
    apiGetBaseInfo('中瀚').then((res) => {
      if (res.code == 0) {
        baseInfo.value = res.data;
      } else {
        console.error(res.msg);
      }
    })
  }
  refresh();
  return { baseInfo, refresh }
})
