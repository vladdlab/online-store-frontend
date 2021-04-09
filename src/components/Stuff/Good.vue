<template>
  <form @submit.prevent="handleSubmit" class="good__form" ref="goodForm">
    <div class="good__form_left">
      <!-- <label for="name">Название</label> -->
      <!-- <input class="good__input" v-model="name" id="name" type="text" /> -->
      <VInput
        class="good__input"
        v-model:modalValue="name"
        @blur="name = 'Влад'"
        id="name"
        type="text"
      />

      <label for="brief_desc">Краткое описание</label>
      <textarea class="good__input" v-model="briefDesc" id="brief_desc" />

      <label for="full_desc">Описание</label>
      <textarea class="good__input" v-model="fullDesc" id="full_desc" />

      <label for="category">Категория</label>
      <VSelect
        class="good__input"
        v-model:modalValue="category"
        name="category"
        id="category"
        :categories="categories"
      />

      <label for="purch_cost">Стоимость закупки</label>
      <input
        class="good__input"
        v-model="purchCost"
        id="purch_cost"
        type="number"
      />

      <label for="sale_cost">Стоимость продажи</label>
      <input
        class="good__input"
        v-model="saleCost"
        id="sale_cost"
        type="number"
      />

      <label for="deliv_date">Дата поставки</label>
      <input
        class="good__input"
        v-model="delivDate"
        id="deliv_date"
        type="date"
      />

      <label for="amount">Количество</label>
      <input class="good__input" v-model="amount" id="amount" type="number" />
    </div>

    <div class="good__form_right">
      <label for="attributes">Атрибуты</label>
      <div class="good__attribute">
        <div v-for="(value, name) in attributes" :key="value">
          {{ name }}: {{ value }}
        </div>
      </div>
      <div class="good__attributes">
        <Attributes
          v-model:atrName.capitalize="atrName"
          v-model:atrValue.capitalize.reverse="atrValue"
        />
        <button type="button" class="good__btn" @click="addAttribute">
          {{ attributes[atrName] ? 'Изменить' : 'Добавить' }}
        </button>
      </div>
      <label for="amount">Прикрепить фотографии</label>
      <Slider :images="images" class="good__slider" style="width: 100%" />
      <input
        type="file"
        id="input"
        ref="inputPhoto"
        @change="handleFiles(data)"
        @click="$refs.inputPhoto.value = null"
        multiple
      />
      <button class="good__submit" type="submit">Изменить товар</button>
    </div>
  </form>
</template>

<script>
import { mapActions } from 'vuex'
import Slider from '@/components/Base/Slider.vue'
import VInput from '@/components/Base/V-Input.vue'
import Attributes from '../Base/Attributes.vue'
import VSelect from '../Base/V-Select.vue'

export default {
  name: 'Good',
  props: ['id'],
  data() {
    return {
      name: '',
      briefDesc: '',
      fullDesc: '',
      category: {},
      attributes: {},
      purchCost: 0,
      saleCost: 0,
      delivDate: '',
      amount: 0,
      photos: null,

      categories: [],
      atrName: '',
      atrValue: '',
      imageURL: '',
      images: []
    }
  },
  beforeMount() {
    this.update()
    this.getCategories().then(response => {
      this.categories = response
    })
  },
  methods: {
    ...mapActions({
      getCategories: 'stuff/getCategories',
      updateGood: 'stuff/updateGood',
      addPhotos: 'stuff/addPhotos',
      getAGood: 'stuff/getAGood'
    }),
    handleSubmit() {
      this.updateGood({
        id: this.id,
        name: this.name,
        brief_desc: this.briefDesc,
        full_desc: this.fullDesc,
        category: this.category.cate_id,
        attributes: this.attributes,
        purch_cost: this.purchCost,
        sale_cost: this.saleCost,
        deliv_date: this.delivDate,
        amount: this.amount
      }).then(() => {
        // this.addPhotos({ id: response.good_id, photos: this.photos })
        this.$refs.inputPhoto.value = null
        this.update()
      })
    },
    update() {
      this.getAGood(this.id).then(response => {
        this.name = response.name
        this.briefDesc = response.brief_desc
        this.fullDesc = response.full_desc
        this.category = response.Category
        this.attributes = response.attributes
        this.purchCost = response.purch_cost
        this.saleCost = response.sale_cost
        this.delivDate = response.deliv_date.slice(0, 10)
        this.amount = response.amount

        for (let photo of response.Photos) {
          this.images.push('http://localhost:8002/uploads/' + photo.url)
        }
      })
    },
    addAttribute() {
      console.log(this.atrName, this.atrValue)
      this.attributes[this.atrName] = this.atrValue
      console.log(this.attributes)
      this.atrName = ''
      this.atrValue = ''
    },
    handleFiles() {
      let files = Array.from(this.$refs.inputPhoto.files)
      this.photos = new FormData()
      for (let i = 0, numFiles = files.length; i < numFiles; i++) {
        this.photos.append(`photo`, files[i])
      }
      this.images = Array.from(this.$refs.inputPhoto.files).map(file =>
        window.URL.createObjectURL(file)
      )
    }
  },
  components: {
    Slider,
    VInput,
    Attributes,
    VSelect
  }
}
</script>

<style scoped lang="scss">
.good__form {
  display: grid;
  grid-template-columns: 2fr 3fr;
  grid-gap: 1em;

  &_left,
  &_right {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
  }

  .good__input {
    width: 100%;
    max-width: 100%;
    min-width: 100%;
  }

  .good__attribute {
    overflow-y: scroll;
    height: 15vh;
    width: 100%;
    margin-bottom: 0.5em;

    text-align: left;
    border: 1px solid #2c3e50;
  }

  .good__attributes {
    display: flex;
    flex-direction: row;
    width: 100%;

    .good__input {
      width: 100%;
      max-width: initial;
      min-width: initial;
    }

    .good__btn {
      border: none;
      background-color: #2c3e50;
      color: white;
      cursor: pointer;
    }
  }

  .good__submit {
    border: none;
    background-color: #2c3e50;
    color: white;
    padding: 0.5em 1em;
    cursor: pointer;
    margin-top: auto;
    align-self: flex-end;
  }

  .good__slider {
    margin-bottom: 0.5em;
    width: 100%;
    border: 1px solid #2c3e50;
  }
}
</style>
