<template>
  <div class="reg__page">
    <div class="reg__module">
      <h2 class="reg__header">Регистрация</h2>
      <form class="reg__form" @submit.prevent="handleSubmit">
        <input
          autofocus
          id="reg_fullname"
          type="text"
          v-model="fullname"
          required
          placeholder="Имя и фамилия"
        />
        <input
          id="reg_tel"
          type="tel"
          pattern="[0-9]{10,15}"
          v-model="tel"
          required
          placeholder="Номер телефона"
        />
        <input
          id="reg_email"
          type="email"
          v-model="email"
          required
          placeholder="Email"
        />
        <input
          id="reg_password"
          type="password"
          v-model="password"
          placeholder="Пароль"
          required
        />
        <input
          id="reg_confirmPassword"
          type="password"
          v-model="confirmPassword"
          placeholder="Повторите пароль"
          required
        />
        <button
          :class="{ 'reg__submit-shown': isFieldsFilled }"
          type="submit"
          class="reg__submit"
        >
          <svg
            id="light"
            fill="#fff"
            enable-background="new 0 0 24 24"
            height="24"
            viewBox="0 0 24 24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g>
              <path
                d="m15.5 12.5h-15c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h15c.276 0 .5.224.5.5s-.224.5-.5.5z"
              />
            </g>
            <g>
              <path
                d="m11.5 16.5c-.128 0-.256-.049-.354-.146-.195-.195-.195-.512 0-.707l3.647-3.647-3.646-3.646c-.195-.195-.195-.512 0-.707s.512-.195.707 0l4 4c.195.195.195.512 0 .707l-4 4c-.098.097-.226.146-.354.146z"
              />
            </g>
            <g>
              <path
                d="m12 23c-4.655 0-8.823-2.947-10.372-7.333-.092-.261.045-.546.305-.638.261-.09.546.045.638.305 1.408 3.987 5.197 6.666 9.429 6.666 5.514 0 10-4.486 10-10s-4.486-10-10-10c-4.232 0-8.021 2.679-9.428 6.667-.092.26-.378.395-.638.305-.26-.092-.397-.377-.305-.638 1.548-4.387 5.716-7.334 10.371-7.334 6.065 0 11 4.935 11 11s-4.935 11-11 11z"
              />
            </g>
          </svg>
        </button>
      </form>

      <div
        class="reg__error"
        :class="{ 'reg__error-shown': errorText }"
        v-text="errorText"
      ></div>

      <div class="reg__actions">
        <router-link to="login">Уже есть аккаунт?</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Registration',

  data() {
    return {
      tel: '',
      password: '',
      confirmPassword: '',
      fullname: '',
      email: '',
      errorText: ''
    }
  },
  computed: {
    first_name() {
      return this.fullname.split(' ')[0]
    },
    last_name() {
      return this.fullname.split(' ')[1]
    },
    isFieldsFilled() {
      return (
        this.tel &&
        this.password &&
        this.confirmPassword &&
        this.fullname &&
        this.email &&
        this.confirmPassword === this.password
      )
    }
  },
  methods: {
    ...mapActions({
      regUser: 'login/regUser'
    }),

    handleSubmit() {
      this.regUser({
        tel: this.tel,
        email: this.email,
        first_name: this.first_name,
        last_name: this.last_name,
        password: this.password
      })
        .then(response => {
          localStorage.setItem('user', JSON.stringify(response.data.user))
          localStorage.setItem('jwt', response.data.token)
          if (localStorage.getItem('jwt') != null) {
            this.$router.push('/hellouser')
          }
        })
        .catch(error => {
          this.errorText = error.response.data.message
          console.error(error)
        })
    }
  }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.reg {
  &__page {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    background-image: url('../assets/reg_background.jpg');
    background-color: #b7bfc7;
    background-size: cover;
    background-position: 80% center;
    overflow-y: auto;
  }

  &__header {
    font-family: 'Poiret One', cursive;
    font-size: 2rem;
    font-weight: bold;
    margin: 0 0 0.3em;
  }

  &__module {
    margin-left: 18vw;
    margin-top: -5vw;
    width: 300px;
  }

  &__form {
    display: flex;
    flex-direction: column;
    position: relative;
    margin: 1em 0;

    font-family: 'Open Sans', sans-serif;

    input {
      width: 90%;
      border: none;
      padding: 1em;
      font-size: 1rem;
      outline: none;
      transition: all ease-in-out 0.15s;
      z-index: 2;

      &:first-of-type {
        border-radius: 15px 15px 0 0;
      }

      &:last-of-type {
        border-radius: 0 0 15px 15px;
      }

      &:focus {
        z-index: 1;
        box-shadow: 0 0 3px 0px #2c3e50;
      }
    }

    input + input {
      margin-top: 0.1em;
    }
  }

  &__submit {
    position: absolute;
    bottom: 0.7em;
    right: 0.5em;
    z-index: 3;

    border-radius: 50%;
    border: none;
    background-color: #2c3e50;
    width: 2.5em;
    height: 2.5em;
    padding: 0.23em 0.2em 0.2em;
    cursor: pointer;

    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform ease-in 0.3s;
    transform: scale(0, 0);

    &-shown {
      transform: scale(1, 1) rotate(1turn);
    }
  }

  &__error {
    height: 0;
    transition: all ease 0.3s;
    color: rgb(172, 19, 19);

    &-shown {
      margin: 0.5em 0 1.5em;
      height: 1em;
    }
  }

  &__actions {
    margin-top: 0.5em;
    display: flex;
    align-items: baseline;
    justify-content: center;

    a {
      color: #2c3e50;
      font-size: 0.8rem;
    }
  }

  &__devider {
    margin: 0 0.5em;
  }
}
</style>
