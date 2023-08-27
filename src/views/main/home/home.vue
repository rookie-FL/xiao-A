<template>
    <div style="width: 100%;height: 100%; backgroundColor:rgba(239, 239, 239, 100)">
        <show-first-4></show-first-4>
        <show-first-1></show-first-1>
        <show-first-2></show-first-2>
        <show-first-5></show-first-5>
        <show-first-3></show-first-3>


    </div>
</template>


<script>
import router from '@/router';
import ShowFirst1 from './c-home/ShowFirst1.vue';
import ShowFirst2 from './c-home/ShowFirst2.vue';
import ShowFirst3 from './c-home/ShowFirst3.vue';
import ShowFirst4 from './c-home/ShowFirst4.vue';
import ShowFirst5 from './c-home/ShowFirst5.vue';

export default {
    name: "home",
    components: {
        ShowFirst1,
        ShowFirst2,
        ShowFirst3,
        ShowFirst4,
        ShowFirst5,
    },
    
}

</script>s