function loadPriceList () {
  var list = {}

  list['classic'] = { name: 'classic', value: 269.99 }
  list['standout'] = { name: 'standout', value: 322.99 }
  list['premium'] = { name: 'premium', value: 394.99 }

  return list
}

function loadCustomerPricingData () {
  var list = {}

  list['unilever'] = [
    { name: 'BuyForRule', itemName: 'classic', config: { buy: 3, for: 2 } }
  ]

  list['apple'] = [
    { name: 'UpdatePriceRule', itemName: 'standout', config: { quantity: 1, newValue: 299.99 } }
  ]

  list['nike'] = [
    { name: 'UpdatePriceRule', itemName: 'premium', config: { quantity: 4, newValue: 379.99 } }
  ]

  list['ford'] = [
    { name: 'BuyForRule', itemName: 'classic', config: { buy: 5, for: 4 } },
    { name: 'UpdatePriceRule', itemName: 'standout', config: { quantity: 1, newValue: 309.99 } },
    { name: 'UpdatePriceRule', itemName: 'premium', config: { quantity: 3, newValue: 389.99 } }
  ]

  return list
}

module.exports = {
  priceList: loadPriceList(),
  customerPricingData: loadCustomerPricingData()
}
