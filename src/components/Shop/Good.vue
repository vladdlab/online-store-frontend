<template>
  <div>
    <Slider />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import Slider from '@/components/Base/Slider.vue'

export default {
  name: 'Good',
  props: ['id'],
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
      }).then(response => {
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
