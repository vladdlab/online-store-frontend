<template>
  <div class="header">
    <div class="header__id">ФИО</div>
    <div class="header__name">Телефон</div>
    <div class="header__status">Должность</div>
    <div class="header__pay_type">Паспорт</div>
    <div class="header__createdAt">Трудовая</div>
    <div class="header__sum">Подтверждён</div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.header {
  display: grid;
  grid-template-columns: 1.5fr 1fr 1fr 1fr 1fr 0.5fr;

  font-weight: bold;

  padding: 1em 2em;

  & > div {
    text-align: left;
  }
}
</style>
