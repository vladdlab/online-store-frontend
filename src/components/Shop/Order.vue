<template>
  <div class="order" v-if="order">
    <div class="order__info">
      <h2>Заказ № {{ order.order_id.slice(0, 8) }}</h2>
      <div class="order__pay_type">
        Тип оплаты: <b>{{ order.pay_type }}</b>
      </div>
      <div class="order__status">
        Статус:
        <select
          @change="changeOrderStatus({ id: id, status: status })"
          class="order__select"
          v-model="status"
          name=""
          id=""
        >
          <option v-for="(status, i) in statuses" :key="i">{{ status }}</option>
        </select>
      </div>
      <div class="order__date">
        Дата формирования: <b>{{ order.createdAt.slice(0, 10) }}</b>
      </div>
    </div>

    <div class="order__customer">
      <h3>Покупатель:</h3>
      <div
        style="display: flex; flex-direction: column; align-items: flex-start; margin-left: 1em"
      >
        <div class="fullname">
          {{ order.Customer.last_name + ' ' + order.Customer.first_name }}
        </div>
        <div class="tel">Номер телефона: {{ order.Customer.tel }}</div>
        <div class="email">Электронная почта: {{ order.Customer.email }}</div>
      </div>
    </div>

    <div class="order__address">
      <h3>Адрес:</h3>
      <span style="margin-left: 1em">{{ address }}</span>
    </div>

    <h2>Товары</h2>
    <GoodsHeader />
    <div class="order__goods">
      <GoodItem v-for="good in order.Goods" :key="good.good_id" :good="good" />
    </div>
    <div class="order__sum">
      <h3>Сумма:</h3>
      <span style="margin-left: 1em">{{ order.sum }}</span>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import GoodItem from '@/components/Shop/GoodItem.vue'
import GoodsHeader from '@/components/Shop/GoodsHeader.vue'

export default {
  name: 'Order',
  props: ['id'],
  data() {
    return {
      status: null,
      statuses: ['in-process', 'confirmed', 'paid-up', 'received', 'canceled']
    }
  },
  created() {
    console.log(this.user)
    this.getAnOrder({
      id: this.user.id,
      orderId: this.$route.params.id
    }).then(response => {
      this.status = response.status
    })
  },
  methods: {
    ...mapActions({
      getAnOrder: 'user/getAUserOrder',
      changeOrderStatus: 'stuff/changeOrderStatus'
    })
  },
  computed: {
    ...mapGetters({
      order: 'user/order',
      user: 'login/user'
    }),
    address() {
      const address = this.order.Address
      return `${address.city} ${address.street} ${address.building} ${address.entr} ${address.apart}`
    }
  },
  components: {
    GoodItem,
    GoodsHeader
  }
}
</script>

<style lang="scss" scoped>
.order {
  padding: 1em;

  &__info {
    display: flex;
    flex-direction: row;
    align-items: baseline;
    justify-content: space-between;
  }

  &__select {
    border: none;
    box-shadow: none;
  }

  &__customer {
    display: flex;
    flex-direction: row;
    align-items: baseline;
    justify-content: flex-start;
  }

  &__address {
    display: flex;
    flex-direction: row;
    align-items: baseline;
    justify-content: flex-start;
  }

  &__sum {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
  }
}
</style>
