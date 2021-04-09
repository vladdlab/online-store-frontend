<template>
  <CatalogHeader />
  <div class="catalog">
    <Search @search="searchGoods" />
    <main class="catalog__main">
      <CatalogItem v-for="good in goods" :key="good.good_id" :good="good" />
    </main>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Search from '@/components/Base/Search.vue'
import CatalogItem from '@/components/Shop/CatalogItem.vue'
import CatalogHeader from '@/components/Shop/CatalogHeader.vue'

export default {
  name: 'AddGood',
  components: {
    Search,
    CatalogItem,
    CatalogHeader
  },
  beforeMount() {
    this.getAllGoods()
  },
  computed: {
    ...mapGetters({
      goods: 'stuff/goods'
    })
  },
  methods: {
    ...mapActions({
      getAllGoods: 'stuff/getAllGoods'
    }),
    searchGoods(searchString) {
      this.getAllGoods({ search: searchString })
    }
  }
}
</script>

<style scoped lang="scss">
.catalog {
  max-width: 70vw;
  min-height: 100px;
  margin: 2em auto;

  &__main {
    margin-top: 1em;

    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 1em;
  }
}
</style>
