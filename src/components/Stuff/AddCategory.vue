<template>
  <form @submit.prevent="handleSubmit" class="good__form">
    <label for="name">Название</label>
    <input id="name" type="text" v-model="category" />

    <button class="good__submit" type="submit">Добавить категорию</button>
  </form>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'AddGood',
  data() {
    return {
      category: ''
    }
  },
  methods: {
    ...mapActions({
      addCategory: 'stuff/addCategory'
    }),
    handleSubmit() {
      this.addCategory({ name: this.category })
      this.category = ''
    }
  }
}
</script>

<style scoped lang="scss">
.good__form {
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  .good__submit {
    border: none;
    background-color: #2c3e50;
    color: white;
    padding: 0.5em 1em;
    cursor: pointer;
    margin-top: 0.5em;
  }
}
</style>
