# Menhera

an experimental lovely frame

### Install

```bash
yarn add menhera
```

### Example

```js
import Mhr from "menehra";

Mhr.$use({
  _hooks: {
    foo: {
      bar: {
        test: ({ _val }) => console.log(_val),
        testFn: ({ _val }) => console.log(_val())
      }
    }
  },
  "foo.bar": {
    test: "foo bar",
    testFn: () => "foo bar"
  }
});
```
