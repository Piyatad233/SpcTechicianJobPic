<template>
  <div>
    <q-dialog :v-model="dialogshow" max-width="500" persistent scrollable>
      <q-card>
          <q-container elevation-4 mt-2 class="black--text blue-grey lighten-5"
            ><div>ชื่อ:  {{showData}}</div>   
          </q-container>    
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
export default {
    props: {
    dialogshow: {
      
    },
   showData: {
     
    },
  },
  data() {
    return {
      index: 0
    };
  },
  methods: {
  },
  watch: {

  }
};
</script>

<style>

</style>