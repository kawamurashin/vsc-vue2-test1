<template>
  <div style="background-color:#DDDDDD" class="list-group-item d-flex flex-row align-baseline">

    <v-spacer></v-spacer>
    <div>
      追加
    </div>
    <div>
      <v-text-field v-model="inputs" style="margin-left:20px"></v-text-field>
    </div>

    <div>
      <v-btn @click="clickHandler" style="margin-left:20px">Input</v-btn>
    </div>

  </div>
</template>

<script>
export default {
  name: 'InputComponent',
  data: () => ({
    inputs:""

  }),
  mounted() {
    console.log("hoge")
  },
  methods: {
    clickHandler(){
      
      console.log("click")
      console.log("model " + this.inputs)
      this.$emit('add' , this.inputs);
    }
  }
}
</script>

<style>
</style>