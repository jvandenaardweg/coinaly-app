import { shallowMount } from '@vue/test-utils'
import TradingViewChart from '@/components/TradingViewChart.vue'

const exampleQuoteCurrency = 'XVG'
const exampleBaseCurrency = 'BTC'
const exampleExchangeName = 'BITTREX'

describe('components/TradingViewChart.vue', () => {
  let component

  beforeEach(() => {
    component = shallowMount(TradingViewChart, {
      stubs: ['router-link', 'router-view']
    })
  })

  it('renders a vue instance', () => {
    expect(component.isVueInstance()).toBe(true)
  })

  it('should set the correct baseCurrency', () => {
    component.setProps({
      baseCurrency: exampleBaseCurrency
    })
    expect(component.props().baseCurrency).toBe(exampleBaseCurrency)
  })


  it('should set the correct quoteCurrency', () => {
    component.setProps({
      quoteCurrency: exampleQuoteCurrency
    })
    expect(component.props().quoteCurrency).toBe(exampleQuoteCurrency)
  })

  it('should set the correct exchange', () => {

    component.setProps({
      exchange: exampleExchangeName
    })
    expect(component.props().exchange).toBe(exampleExchangeName)
  })

  it('should use the correct TradingView symbol naming', () => {
    component.setProps({
      exchange: exampleExchangeName,
      quoteCurrency: exampleQuoteCurrency,
      baseCurrency: exampleBaseCurrency
    })
    expect(component.vm.tradingViewSymbol).toBe(`${exampleExchangeName}:${exampleQuoteCurrency}${exampleBaseCurrency}`)
  })

  it('should generate a timezone name', () => {
    expect(component.vm.userTimezone).toBeTruthy()
  })
})
