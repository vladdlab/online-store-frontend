<template>
  <Search @search="searchGoods" />
  <GoodsHeader />
  <div class="goods">
    <GoodItem v-for="good in goods" :key="good.good_id" :good="good" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Search from '@/components/Base/Search.vue'
import GoodsHeader from '@/components/Stuff/GoodsHeader.vue'
import GoodItem from '@/components/Stuff/GoodItem.vue'

export default {
  name: 'AddGood',
  components: {
    Search,
    GoodsHeader,
    GoodItem
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
.search {
  &__input {
    width: 90%;
  }
  &__btn {
    width: 10%;
    border: none;
    background-color: #2c3e50;
    color: white;
    padding: 0.5em 1em;
    font-size: 1rem;
    border: 1px solid #2c3e50;
    cursor: pointer;
  }
}

.goods {
  width: 100%;
  height: 76.5vh;

  overflow-y: scroll;

  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
}
</style>
