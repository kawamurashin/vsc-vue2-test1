<template>
  <v-app>
    <BarComponent @child-emit="childClickHandler" />
    <v-main>
      <DraggableComponent :tables="tables" @draggable-end="dragEndHandler" @rename-click="renameClickHandler" />
      <div>
        {{ await_name }}<br>
      </div>
      hoge8

      <InputComponent @add="addInputHandler"></InputComponent>
      <HelloWorld />
    </v-main>
  </v-app>
</template>

<script>
import HelloWorld from './components/HelloWorld';
import InputComponent from './components/InputComponent.vue';
import BarComponent from "@/components/BarComponent.vue";
import DraggableComponent from "@/components/DraggableComponent.vue";
import { ModelManager } from "@/scripts/model/modelManager.js";
export default {
  name: 'App',

  components: {
    HelloWorld,
    BarComponent,
    DraggableComponent,
    InputComponent
  },

  data: () => ({
    //
    await_name: "hoge",
    tables: [],
  }),
  mounted() {

    console.log("moutend " + new Date())
    this.load();

  },
  methods: {
    load(){

    ModelManager.getInstance().load().then(result => {
      this.await_name = result.data.data.name
      this.tables = result.data.data.tables;
    })


    },
    childClickHandler() {
      console.log("child click");
      console.log("hoge");

      
    },
    dragEndHandler(items) {
      //console.log("dragEndHandler")
      let n = items.length
      for(let i = 0;i<n;i++)
      {
        let obj = items[i];
        obj.order = i.toString();
        //console.log("obj " + JSON.stringify(obj));
      }
      const obj = {
        "items": items
      }
      ModelManager.getInstance().orderChange(obj).then(result => {
        if(result.status == "ok"){

          this.load();
          //console.log("order change complete2 " + JSON.stringify(result))
        }
      })

    },
    renameClickHandler(data) {
      this.tables = data.items;
      let obj = this.tables.find(v => v.id == data.id);
      if (obj) {
        obj.name = obj.form;
        obj.form = "";
      }
    },
    addInputHandler(value) {
      console.log("add input handler")
      console.log(value)
      let obj ={
        "name":value
      }

      ModelManager.getInstance().add(obj).then(result => {
        if(result.status == "ok"){
          this.load();
        }
      })



    }
  }
};
</script>
