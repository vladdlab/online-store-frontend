<template>
  <div class="header">
    <div class="header__name">Имя</div>
    <div class="header__category">Категория</div>
    <div class="header__amount">Количество</div>
    <div class="header__purch_cost">Цена закупки</div>
    <div class="header__sale_cost">Цена продажи</div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.header {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 1fr;

  font-weight: bold;

  padding: 1em;
}
</style>
