<template>
  <div>
    <div>draggable!!</div>
    <draggable
        v-model="items"
        @start="drag=true"
        @end="dragMouseUpHandler"
        item-key="id"
        v-bind="dragOptions"
        handle=".handle">

      <div v-for="element in items" :key="element.id" class="list-group-item d-flex flex-row align-baseline">
          <div class="handle">
            <v-icon
                large
                color="black"
                style="margin: 10px">
              mdi-drag-horizontal-variant
            </v-icon>
          </div>

        <div >{{ element.name }} </div>
        <div style="margin-left: 1%;"><v-text-field type="text" class="form-control" v-model="element.form"/> </div>
        <div ><v-btn @click="renameClickHandler(element)">rename</v-btn></div>
      </div>
    </draggable>
  </div>
</template>

<script>
import draggable from 'vuedraggable'

export default {
  name: "DraggableComponent",
  components: {
    draggable
  },
  props: ["tables"],
  data: () => ({
    drag: false,
    items: []
  }),
  mounted() {
  },
  methods: {
    dragMouseUpHandler() {
      /*
      const n = this.items.length
      for (let i = 0; i < n; i++) {
        let item = this.items[i];
        console.log("items  " + JSON.stringify(item))
      }*/
      this.drag = false;

      this.$emit('draggable-end')
    },
    renameClickHandler(item){
      const data ={
        id:item.id,
        items:this.items
      }
      this.$emit('rename-click',data)
    }
  },
  computed: {
    dragOptions() {
      return {
        animation: 200,
        group: "description",
        disabled: false,
        ghostClass: "ghost"
      };


    }
  },
  watch: {
    "tables": function (value) {
      this.items = value;

    },
  }
}
</script>
<style>
*{ text-transform: none !important; }
.ghost {
  opacity: 0.75;
  background: #c8ebfb;
}

.form-control {

}

.list-group-item {
  padding: 5px;
  border-bottom: solid #000000 1px;

}

.handle {
  cursor: move;
}
</style>