import { shallowMount } from '@vue/test-utils'
import TradingViewChart from '@/components/TradingViewChart.vue'

const exampleQuoteId = 'XVG'
const exampleBaseId = 'BTC'
const exampleExchangeName = 'BITTREX'

describe('components/TradingViewChart.vue', () => {
  let component

  beforeEach(() => {
    component = shallowMount(TradingViewChart, {
      stubs: ['router-link', 'router-view'],
      propsData: {
        exchange: exampleExchangeName,
        baseId: exampleBaseId,
        quoteId: exampleQuoteId
      }
    })
  })

  it('renders a vue instance', () => {
    expect(component.isVueInstance()).toBe(true)
  })

  it('should set the correct baseId', () => {
    expect(component.props().baseId).toBe(exampleBaseId)
  })

  it('should set the correct quoteId', () => {
    expect(component.props().quoteId).toBe(exampleQuoteId)
  })

  it('should set the correct exchange', () => {
    expect(component.props().exchange).toBe(exampleExchangeName)
  })

  it('should use the correct TradingView symbol naming', () => {
    expect(component.vm.tradingViewSymbol).toBe(`${exampleExchangeName}:${exampleBaseId}${exampleQuoteId}`)
  })

  it('should generate a timezone name', () => {
    expect(component.vm.userTimezone).toBeTruthy()
  })
})
