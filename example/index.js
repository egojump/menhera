import Mhr from '../src'

Mhr.$use({
  $foo: {
    bar: {
      test: ({_val}) => console.log(_val),
      testFn: ({_val}) => console.log(_val())
    }
  },
  'foo.bar': {
    test: 'foo bar',
    testFn: () => 'foo bar'
  }
})
