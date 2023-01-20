<template>
  <div style="margin-top: 16px;">
    <CButton
      v-if="handleSubmit"
      color="success"
      @click="submitItem"
      type="button"
    >
      Simpan
    </CButton>
    <CButton
      v-if="handleReset"
      color="info"
      @click="resetItem"
    >
      Reset
    </CButton>
  </div>
</template>

<script>
export default {
  name: "Toolbar",
  props: {
    handleSubmit: {
      type: Function,
      required: false
    },
    handleReset: {
      type: Function,
      required: false
    },
    handleDelete: {
      type: Function,
      required: false
    },
    handleAdd: {
      type: Function,
      required: false
    },
  },
  methods: {
    async submitItem(){
      try{
        if(this.handleSubmit){
          await this.handleSubmit()
        }
      }catch (err){
        console.log(err)
      }
    },
    resetItem() {
      if (this.handleReset) {
        this.handleReset();
      }
    }
  }
}
</script>

<style scoped>

</style>
