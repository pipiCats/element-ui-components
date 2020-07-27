<template>
  <div class="furion-input-number">
    <el-input-number v-bind="inputProps" v-on="$listeners" />
  </div>
</template>

<script>
export default {
  props: ["value"],
  computed: {
    inputProps() {
      return {
        controlsPosition: "right",
        ...this.$attrs,
        ...this.$props,
      };
    },
  },
};
</script>
<style lang="css" scoped>
.furion-input-number .el-input-number{
  width: 100% ;
}
</style>
