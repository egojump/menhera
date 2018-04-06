import Menhera from "../src";

const test = ({ _val }) => console.log(_val);

const mount = {
  name: "data",
  _hooks: {
    data: {
      test1: test,
      test2: test
    }
  }
};

const _ = new Menhera({
  _mount: {
    foo: [mount]
  }
}).$use({
  data: {
    test1: "foo",
    test2: "bar"
  }
});
