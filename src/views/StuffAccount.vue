<template>
  <div class="stuff">
    <aside class="stuff__aside">
      <nav class="nav">
        <h1 class="nav__title">
          Кабинет продавца
        </h1>
        <router-link
          class="nav__item"
          :to="{ name: 'stufforders' }"
          active-class="nav__item_active"
        >
          Заказы
        </router-link>
        <router-link
          class="nav__item"
          :to="{ name: 'stuffgoods' }"
          active-class="nav__item_active"
        >
          Товары
        </router-link>
        <div class="nav__item">Выход</div>
      </nav>
    </aside>
    <main class="stuff__main">
      <router-view />
    </main>
  </div>
</template>

<script>
export default {
  name: 'stuffAccount'
}
</script>

<style lang="scss" scoped>
.stuff {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 300px 1fr;

  &__aside {
    width: 100%;
    height: 100%;
    background: #2c3e50;

    .nav {
      display: flex;
      flex-direction: column;
      align-items: flex-start;

      &__title {
        font-family: 'Poiret One', cursive;
        color: white;
        margin: 1em 1.7em;
        padding: 0;
      }

      &__item {
        box-sizing: border-box;
        width: 95%;
        align-self: flex-end;
        padding: 1em;
        margin-bottom: 0.5em;
        border-radius: 15px 0 0 15px;

        font-size: 1rem;
        text-decoration: none;
        color: white;
        text-align: left;
        transition: all 0.05s ease-in;
        cursor: pointer;

        &_active,
        &:hover {
          background-color: white;
          color: #2c3e50;
        }

        &:last-of-type {
          justify-self: flex-end;
        }
      }
    }
  }

  &__main {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    padding: 1em;
  }
}
</style>
