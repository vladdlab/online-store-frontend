<template>
  <div class="header">
    <div class="header__id">ID</div>
    <div class="header__name">Покупатель</div>
    <div class="header__status">Статус</div>
    <div class="header__pay_type">Тип оплаты</div>
    <div class="header__createdAt">Дата</div>
    <div class="header__sum">Сумма</div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.header {
  display: grid;
  grid-template-columns: repeat(6, 1fr);

  font-weight: bold;

  padding: 1em;
}
</style>
