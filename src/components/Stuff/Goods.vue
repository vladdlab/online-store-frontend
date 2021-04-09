<template>
  <div class="goods">
    <nav class="goods__nav">
      <button class="nav__item" @click="currentComponent = 'AddGood'">
        Добавить новый товар
      </button>
      <button class="nav__item" @click="currentComponent = 'AddCategory'">
        Добавить новую категорию
      </button>
      <button class="nav__item" @click="currentComponent = 'GoodsList'">
        Изменить или удалить товар
      </button>
    </nav>
    <div class="goods__main">
      <component :is="currentComponent"></component>
    </div>
  </div>
</template>

<script>
import AddGood from '@/components/Stuff/AddGood.vue'
import AddCategory from '@/components/Stuff/AddCategory.vue'
import GoodsList from '@/components/Stuff/GoodsList.vue'
export default {
  name: 'stuffAccount',
  data() {
    return {
      currentComponent: 'GoodsList'
    }
  },
  components: {
    AddGood,
    GoodsList,
    AddCategory
  }
}
</script>

<style lang="scss" scoped>
.goods {
  width: 100%;
  height: 100%;

  &__dialog {
  }

  &__nav {
    display: flex;
    flex-direction: row;
    margin-bottom: 1em;

    .nav__item {
      padding: 0.8em 1.5em;
      margin-right: 1em;
      border-radius: 5px;
      border: none;

      background: #2c3e50;
      color: white;
      cursor: pointer;
    }
  }
}
</style>
