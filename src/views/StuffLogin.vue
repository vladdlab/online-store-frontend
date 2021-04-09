<template>
  <div class="login__page">
    <div class="login__module">
      <h2 class="login__header">Войти как сотрудник</h2>
      <form @submit.prevent="handleSubmit" class="login__form">
        <input
          id="log_tel"
          type="tel"
          pattern="[0-9]{10,15}"
          v-model="tel"
          required
          placeholder="Номер телефона"
          autofocus
        />
        <input
          id="log_password"
          type="password"
          v-model="password"
          placeholder="Пароль"
          required
        />
        <button
          :class="{ 'login__submit-shown': isFieldsFilled }"
          type="submit"
          class="login__submit"
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
        class="login__error"
        :class="{ 'login__error-shown': errorText }"
        v-text="errorText"
      ></div>

      <div class="login__actions">
        <router-link to="reg">Регистрация</router-link>
        <div class="login__devider">|</div>
        <router-link to="reg">Забыли пароль?</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Login',
  data() {
    return {
      tel: '',
      password: '',
      errorText: ''
    }
  },
  computed: {
    isFieldsFilled() {
      return this.tel && this.password
    }
  },
  methods: {
    ...mapActions({
      loginStuff: 'login/loginStuff'
    }),

    handleSubmit() {
      this.loginStuff({
        tel: this.tel,
        pass: this.password
      })
        .then(response => {
          localStorage.setItem('user', JSON.stringify(response.data.user))
          localStorage.setItem('jwt', response.data.token)
          if (localStorage.getItem('jwt') != null) {
            this.$router.push({ name: 'stuff' })
          }
        })
        .catch(error => {
          this.errorText = error.response.data.message
          console.error(error)
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.login {
  &__page {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    background-image: url('../assets/stuff_log_background.jpg');
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
    margin-right: 10vw;
    margin-top: -3vw;
    width: 300px;
  }

  &__form {
    display: flex;
    flex-direction: column;
    position: relative;
    margin: 0.7em 0;

    font-family: 'Open Sans', sans-serif;

    input {
      width: 90%;
      border: none;
      padding: 1em;
      font-size: 1rem;
      border-radius: 15px 15px 0 0;
      outline: none;
      transition: all ease-in-out 0.15s;
      z-index: 2;

      &:last-of-type {
        margin-top: 0.1em;
        border-radius: 0 0 15px 15px;
      }

      &:focus {
        z-index: 1;
        box-shadow: 0 0 3px 0px #2c3e50;
      }
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
    outline: none;

    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform ease-in 0.3s, box-shadow ease-in 0.1s;
    transform: scale(0, 0);

    &-shown {
      transform: scale(1, 1) rotate(1turn);
    }

    &:focus {
      box-shadow: 0 0 0 2px #177790;
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
    margin: 0 0.7em;
  }
}
</style>
