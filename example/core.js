import { core } from "../src";

class Foo {
  constructor() {}
}
const Bar = parms => core({ _: new Foo(), parms });

const test = ({ _val }) => console.log(_val);
const testFn = ({ _val }) => console.log(_val());
const testEach = ({ _val }) => {
  for (let [key, val] of Object.entries(_val)) {
    typeof val === "function" && testFn({ _val: val });
    typeof val !== "function" && test({ _val: val });
  }
};

const _ = new Bar({
  _hooks: {
    foo: {
      bar: {
        foo1: {
          bar1: {
            _: testEach,
            test,
            testFn
          }
        }
      }
    }
  },
  foo: {
    bar: {
      foo1: {
        bar1: {
          test: "foo bar",
          testFn: () => "foo bar"
        }
      }
    }
  }
});
