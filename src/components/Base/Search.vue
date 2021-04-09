<template>
  <form @submit.prevent="$emit('search', searchString)" class="search">
    <div>
      <input
        class="search__input"
        v-model="searchString"
        type="search"
        id="mySearch"
        name="q"
      />
      <button class="search__btn">Поиск</button>
    </div>
  </form>
</template>

<script>
export default {
  name: 'Search',
  data() {
    return {
      searchString: ''
    }
  }
}
</script>

<style lang="scss" scoped>
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
</style>
