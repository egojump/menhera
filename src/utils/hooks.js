import get from "lodash.get";
import set from "lodash.set";
import { scanObject, $ } from "../utils";

export const initHooks = _ => {
  let cache = {};
  cache._hooks = { _: [_hooks] };
  cache._mount = { $: [_mount] };
  return cache;
};

export const _hooks = ({ _, _val, cp }) => {
  if (typeof _val === "object") {
    const onFunction = ({ depth, _val }) => {
      let target = get(_.hooks, depth, []);
      if (!target.includes(_val.bind(cp))) {
        target.push(_val.bind(cp));
        set(_.hooks, depth, target);
      }
    };
    const onVariable = ({ depth, _val }) => {
      if (Array.isArray(_val)) {
        _val.forEach(val => {
          if (typeof val === "function") {
            onFunction({ depth, _val: val });
          }
        });
      }
    };
    const onObject = ({ object, depth, _key, _val }) => {
      scanObject({ object, depth, onObject, onFunction, onVariable });
    };
    onObject({ object: _val, depth: "" });
  }
};

export const _mount = {
  $({ _, _val, cp }) {
    let cps = Array.isArray(_val) ? _val : [_val];
    cps.forEach(async component => {
      let cp = typeof component === "function" ? component({ _ }) : component;
      _.$use(cp);
      const { name } = cp;
      if (_[name]) {
        throw new Error(`_mount: name "${name}" exists, please another one`);
      }
      _[name] = cp;
    });
  }
};
