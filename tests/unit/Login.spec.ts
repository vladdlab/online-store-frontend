import Login from '@/views/Login.vue'
import { mount } from '@vue/test-utils'
import API from '../../src/api'

jest.mock('../../src/api')

describe('Login', () => {
  test('bebebe', () => {
    const wrapper = mount(Login)
    expect(wrapper.html()).toContain('input')
  })

  test('bebebe2', async () => {
    const wrapper = mount(Login)
    wrapper.find('#log_tel').setValue('89967650097')
    wrapper.find('#log_password').setValue('12341234')
    wrapper.find('form').trigger('submit.prevent')
    await wrapper.vm.$nextTick()
    await setTimeout(() => {
      console.log(wrapper.vm.$data)
    }, 5000)
    expect(wrapper.find('.login__error').text()).toBe('')
  })
})
