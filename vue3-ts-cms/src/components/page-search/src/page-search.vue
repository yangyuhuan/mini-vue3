<template>
  <div class="page-search">
    <hy-form v-bind="searchFormConfig" v-model="formData">
      <template #header>
        <h1 class="header">高级检索</h1>
      </template>
      <template #footer>
        <div class="handle-btns">
          <el-button icon="el-icon-refresh" @click="handleResetClick"
            >重置</el-button
          >
          <el-button
            type="primary"
            icon="el-icon-search"
            @click="handleQueryClick"
            >搜索</el-button
          >
        </div>
      </template>
    </hy-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import HyForm from '@/base-ui/form'
export default defineComponent({
  props: {
    searchFormConfig: {
      type: Object,
      required: true
    }
  },
<<<<<<< HEAD
  setup() {
    const formData = ref({
      id: '',
      name: '',
      password: '',
      sport: '',
      creatTime: ''
    })
    return {
      formData
=======
  setup(props, { emit }) {
    //双向绑定的属性应该是由配置文件的filed来决定
    // 1.优化一: formData中的属性应该动态来决定
    const formItems = props.searchFormConfig?.formItems ?? []
    const formOriginData: any = {}
    for (const item of formItems) {
      formOriginData[item.field] = ''
    }
    const formData = ref(formOriginData)

    //2.优化二:当用户点击重置
    const handleResetClick = () => {
      for (const key in formOriginData) {
        formData.value[`${key}`] = formOriginData[key]
        emit('resetBtnClick')
      }
    }

    //3.优化三:当用户点击搜索
    const handleQueryClick = () => {
      emit('queryBtnClick', formData.value)
    }

    return {
      formData,
      handleResetClick,
      handleQueryClick
>>>>>>> db77a8d3443ca4bd51753c383a101e5b638941f9
    }
  },
  components: {
    HyForm
  }
})
</script>

<<<<<<< HEAD
<style scoped>
=======
<style lang="less" scoped>
>>>>>>> db77a8d3443ca4bd51753c383a101e5b638941f9
.header {
  color: red;
}
.handle-btns {
  text-align: right;
  padding: 0 50px 20px 0;
}
</style>
