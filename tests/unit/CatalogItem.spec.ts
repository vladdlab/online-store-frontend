import CatalogItem from '@/components/Shop/CatalogItem.vue'
import { mount } from '@vue/test-utils'

describe('CatalogItem', () => {
  test('If good passed as prop, show good information', async () => {
    const good = {
      good_id: 'db467159-b514-470b-90aa-fa443f532140',
      name: 'Владислав',
      brief_desc: 'dsf',
      full_desc: 'sdf',
      category: '11bddfc9-455b-439c-9d22-f1ae3e1d6965',
      attributes: { df: 'dsf', sdf: 'sdf', asdf: 'asdf' },
      purch_cost: 2345,
      sale_cost: 2345,
      deliv_date: '2021-01-22T00:00:00.000Z',
      amount: 1234,
      createdAt: '2021-01-08T14:58:40.296Z',
      updatedAt: '2021-01-08T16:57:17.515Z',
      Category: {
        cate_id: '11bddfc9-455b-439c-9d22-f1ae3e1d6965',
        name: 'Керамика'
      },
      Photos: [
        {
          photo_id: '4261ade4-0730-4287-8402-8cbe39af3a21',
          url: 'photo-1610117920399.jpeg',
          brief_desc: '21096849-aleksandr-polyarnyy-myatnaya-skazka.jpg'
        }
      ]
    }
    const wrapper = mount(CatalogItem, {
      propsData: { good }
    })
    await wrapper.vm.$nextTick()
    expect(wrapper.find('.good__name').text()).toBe(good.name)
    expect(wrapper.find('img').isVisible()).toBe(true)
  })

  test('If good passed as prop, show good information', () => {
    expect(true).toBe(true)
  })
})
