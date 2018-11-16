import Vue from 'vue'
import HelloWorld from '@/components/Admin/AdminLogin.vue'

describe('Admin Login Page', () => {
  const Constructor = Vue.extend(HelloWorld)

  beforeEach () {
    
  }
  it('should render correct contents', () => {
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('#login').textContent)
      .to.equal('Login')
  })
  it('should render correct contents', () => {
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('#login').textContent)
      .to.equal('Login')
  })
})
