<template>
  <div class="set">
    <div class="left">
      <programShow></programShow>
      <team></team>
    </div>
    <div class="separator"></div> 
    <div class="right">
      <announceShow></announceShow>
      <infoset></infoset>
    </div>
  </div>
</template>

<script>
import Team from './team.vue';
import programShow from './programShow.vue'
import announceShow from './announceShow.vue';
import infoset from './infoSet.vue'

export default {
  components: {
    Team,
    programShow,
    announceShow,
    infoset
  }
};
</script>

<style>
.set {
  height: 100%;
  display: flex;
  overflow: hidden;
}

.left {
  width: 54%;
}

.right {
  width: 45%;
}

.separator {
  width: 1.5px; 
  background-color: rgba(218, 218, 218); 
  margin: 0 2%;
}
</style>
