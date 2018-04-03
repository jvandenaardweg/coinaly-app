import { shallow } from '@vue/test-utils'
import SelectMarket from '@/components/SelectMarket.vue'
// import VueRouter from 'vue-router'
import '../filters'
const cryptocurrencies = require('cryptocurrencies')

// const localVue = createLocalVue()
// localVue.use(VueRouter)
// const router = new VueRouter()

const testData = {
  currencySymbols: cryptocurrencies,
  quoteCurrencyMarkets: {
    'XVG/BTC': {
      last: 0.0001
    },
    'XVG/USDT': {
      last: 0.0001
    },
    'XLM/BTC': {
      last: 0.0001
    },
    'BTC/USDT': {
      last: 0.0001
    },
    'ETH/BTC': {
      last: 0.0001
    },
    'ETH/USDT': {
      last: 0.0001
    }
  },
  allMarkets: {
    'XLM/BTC': {
      last: 0.0001
    },
    'XVG/BTC': {
      last: 0.0001
    }
  },
  allFilledCurrencies: {
    'XVG': {
      free: 1500,
      total: 1500
    },
    'XLM': {
      free: 21573,
      total: 21573
    },
    'GVT': {
      free: 25.06784267,
      total: 25.06784267
    },
    'BTC': {
      free: 1.65789234,
      total: 1.65789234
    },
    'USDT': {
      free: 9013,
      total: 9013
    },
    'ETH': {
      free: 3.2467,
      total: 3.2467
    }
  },
  isLoadingMarkets: true,
  previousBaseCurrency: null,
  quoteCurrency: 'XVG',
  nextStepAction: 'Next Step: Pricing',
  routeBase: 'sell'
}

describe('SelectMarket.vue', () => {
  let component

  beforeEach(() => {
    component = shallow(SelectMarket, {
      stubs: ['router-link', 'router-view'],
      propsData: testData
    })
  })

  // it('should show a loading indicator when loading the markets', () => {
  //   testData.isLoadingMarkets = true
  //   expect(component.props().isLoadingMarkets).toBe(true)
  // })

  // it('should show markets', () => {
  //   expect(component.vm.hasMarkets).toBe(true)
  // })

  // it('should give the correct base symbol from a market symbol', () => {
  //   expect(component.vm.marketSymbolToBaseSymbol('XRP/BTC')).toBe('BTC')
  //   expect(component.vm.marketSymbolToBaseSymbol('XRP/ETH')).toBe('ETH')
  // })

  // it('should give the correct full name currency', () => {
  //   expect(component.vm.fullCurrencyName('XRP/BTC')).toBe('Bitcoin')
  //   expect(component.vm.fullCurrencyName('XRP/ETH')).toBe('Ethereum')
  //   expect(component.vm.fullCurrencyName('BTC/USDT')).toBe('Tether')
  // })

  it('should give the correct max sell price', () => {
    // TODO: check this test, shouldnt be the same "0.15"
    expect(component.vm.maxSellPrice('XLM/BTC')).toBe(0.15)
    expect(component.vm.maxSellPrice('XVG/BTC')).toBe(0.15)
  })

  // it('should show a message when market is not found', () => {
  //   //
  // })

  // it('should set correct baseCurrency when clicking on a market', () => {
  //   //
  // })

  // it('should render the correct market symbol', () => {
  //   //
  // })

  // it('should render the correct market name', () => {
  //   //
  // })

  // it('should render the correct market symbol icon', () => {
  //   //
  // })

  // it('should render the correct max sell price', () => {
  //   //
  // })

  // it('should render the correct next step link', () => {
  //   //
  // })
})
