<template>
  <div class="user">
    <page-search :searchFormConfig="searchFormConfig" />
    <div class="content"></div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import PageSearch from '@/components/page-search'

import { searchFormConfig } from './config/search.config'
import { useStore } from '@/store'

export default defineComponent({
  name: 'user',
  components: {
    PageSearch
  },
  setup() {
    const store = useStore()
    store.dispatch('system/getPageListAction', {
      pageUrl: '/users/list',
      queryInfo: {
        offset: 0,
        size: 10
      }
    })
    const userList = computed(() => store.state.system.userList)
    const userCount = computed(() => store.state.system.userCount)
    return {
      searchFormConfig,
      userList,
      userCount
    }
  }
})
</script>

<style scoped></style>
