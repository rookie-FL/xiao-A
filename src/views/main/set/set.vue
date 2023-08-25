<template>
  <div class="set">
    <div class="left">
    <programShow></programShow>
    <team></team> 
    </div>
    <div class="right">
    <announceShow></announceShow>
    </div>
    
    
  
  </div>
</template>

<script>
import Team from './team.vue';
import programShow from './programShow.vue'
import announceShow from './announceShow.vue';

export default {
  components: {
    Team,
    programShow, 
    announceShow
  },


};
</script>

<style>
.set{
  height: 100%;
  display: flex;
  overflow: hidden; 
}

.left{
  width: 54%;
}
.right{
  width: 45%;
}
</style>
