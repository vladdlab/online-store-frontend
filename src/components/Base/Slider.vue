<template>
  <vueper-slides fixed-height="41vh">
    <vueper-slide v-for="(image, i) in images" :key="i">
      <template v-slot:content>
        <img :src="image" alt="" srcset="" />
      </template>
    </vueper-slide>
  </vueper-slides>
</template>

<script>
import { VueperSlides, VueperSlide } from 'vueperslides'
import 'vueperslides/dist/vueperslides.css'

export default {
  name: 'SLider',
  props: {
    images: {
      type: Array,
      default: () => []
    }
  },
  components: { VueperSlides, VueperSlide }
}
</script>

<style lang="scss" scoped>
img {
  height: 100%;
  width: 100%;
  object-fit: contain;
}
</style>
