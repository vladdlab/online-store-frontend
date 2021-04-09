<template>
  <Search @search="searchEmployees($event)" />
  <EmployeesHeader />
  <div class="employees">
    <EmployeesItem
      v-for="employee in onlyEmployees"
      :key="employee.id"
      :employee="employee"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Search from '@/components/Base/Search.vue'
import EmployeesHeader from '@/components/Owner/EmployeesHeader.vue'
import EmployeesItem from '@/components/Owner/EmployeesItem.vue'

export default {
  name: 'AddOrder',
  components: {
    Search,
    EmployeesHeader,
    EmployeesItem
  },
  data() {
    return {
      searchString: ''
    }
  },
  beforeMount() {
    this.getAllEmployees()
  },
  async mounted() {},
  computed: {
    ...mapGetters({
      employees: 'stuff/employees'
    }),
    onlyEmployees() {
      return this.employees
        ? this.employees.filter(employee => employee.Employee)
        : []
    }
  },
  methods: {
    ...mapActions({
      getAllEmployees: 'stuff/getAllEmployees'
    }),
    searchEmployees(searchString) {
      console.log(searchString)
      this.getAllEmployees({ search: searchString })
    }
  }
}
</script>

<style scoped lang="scss">
.employees {
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
