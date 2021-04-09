<template>
  <form @submit.prevent="handleSubmit" class="good__form" ref="goodForm">
    <div class="good__form_left">
      <BaseInput label="Название" type="text" id="name" v-model="name" />

      <label for="brief_desc">Краткое описание</label>
      <textarea class="good__input" v-model="briefDesc" id="brief_desc" />

      <label for="full_desc">Описание</label>
      <textarea class="good__input" v-model="fullDesc" id="full_desc" />

      <BaseSelect
        label="Категория"
        :options="categories"
        v-model:modelValue="category"
        class="good__input"
        name="category"
        id="category"
      />

      <BaseCheckbox v-model="checked" label="Чекбокс" />
      <BaseRadioGroup
        v-model="yesOrNo"
        name="yesOrNo"
        :options="[
          { value: 1, label: 'Yes' },
          { value: 0, label: 'No' }
        ]"
      />
      <!-- <BaseRadio v-model="yesOrNo" name="yesOrNo" label="Yes" :value="1" />
      <BaseRadio v-model="yesOrNo" name="yesOrNo" label="No" :value="0" /> -->

      <BaseInput
        label="Стоимость закупки"
        type="number"
        id="purch_cost"
        v-model="purchCost"
      />

      <BaseInput
        label="Стоимость продажи"
        type="number"
        id="sale_cost"
        v-model="saleCost"
      />

      <BaseInput
        label="Дата поставки"
        type="date"
        id="deliv_date"
        v-model="delivDate"
      />

      <BaseInput
        label="Количество"
        type="number"
        id="amount"
        v-model="amount"
      />
    </div>

    <div class="good__form_right">
      <label for="attributes">Атрибуты</label>
      <div
        class="good__attribute"
        v-for="(value, name) in attributes"
        :key="value"
      >
        {{ name }}: {{ value }};
      </div>
      <div class="good__attributes">
        <input
          type="text"
          v-model="atrName"
          placeholder="Название"
          class="good__input"
        />
        <input
          type="text"
          v-model="atrValue"
          placeholder="Значение"
          class="good__input"
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
      <button class="good__submit" type="submit">Добавить товар</button>
    </div>
  </form>
</template>

<script>
import { mapActions } from 'vuex'
import Slider from '@/components/Base/Slider.vue'

export default {
  name: 'AddGood',
  data() {
    return {
      name: '',
      briefDesc: '',
      fullDesc: '',
      category: '',
      attributes: {},
      purchCost: 0,
      saleCost: 0,
      delivDate: '',
      amount: 0,
      photos: null,

      checked: true,
      yesOrNo: 'yes',

      categories: [],
      atrName: '',
      atrValue: '',
      imageURL: '',
      images: []
    }
  },
  beforeMount() {
    this.getCategories().then(response => {
      this.categories = response
    })
  },
  methods: {
    ...mapActions({
      getCategories: 'stuff/getCategories',
      addGood: 'stuff/addGood',
      addPhotos: 'stuff/addPhotos'
    }),
    handleSubmit() {
      this.addGood({
        name: this.name,
        brief_desc: this.briefDesc,
        full_desc: this.fullDesc,
        category: this.category.cate_id,
        attributes: this.attributes,
        purch_cost: this.purchCost,
        sale_cost: this.saleCost,
        deliv_date: this.delivDate,
        amount: this.amount
      }).then(response => {
        this.addPhotos({ id: response.good_id, photos: this.photos })
        this.$refs.inputPhoto.value = null
        this.photos = []
        this.attributes = []
        this.atrName = ''
        this.atrValue = ''
        this.$refs.goodForm.reset()
      })
    },
    addAttribute() {
      this.attributes[this.atrName] = this.atrValue
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
    Slider
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
