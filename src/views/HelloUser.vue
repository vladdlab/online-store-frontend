<template>
  <CatalogHeader />
  <div class="hello">
    <div class="hello__module">
      <router-view />
      <div class="hello__photo">
        <img src="../assets/lk_photo.jpg" alt="Наша прекрасная ваза" />
      </div>
    </div>
  </div>
</template>

<script>
import CatalogHeader from '@/components/Shop/CatalogHeader.vue'

export default {
  name: 'HelloUser',
  components: {
    CatalogHeader
  }
}
</script>

<style scoped lang="scss">
.hello {
  width: 100%;
  height: calc(100% - 8vh);

  &__module {
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: 2fr 1fr;
  }

  &__photo {
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      width: 85%;
    }
  }
}

.orders {
  width: 100%;
  height: 70vh;

  overflow-y: scroll;

  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
}
</style>
