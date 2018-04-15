import { EventEmitter } from "events";
import Menhera from "../src";
import { _data, _lifeCycle } from "./plugins";

const World = _ => ({
  name: "menhera-world",
  _data: {
    entities: {},
    systems: []
  },
  start() {
    setInterval(this.tick.bind(this), 1000);
  },
  tick() {
    let entities = Object.values(this.entities);
    console.log(this.entities);
    const [method, path] = key.split(" ");
    router[method](path, ctx => val(ctx));
    this.systems.forEach(system => {
      entities.forEach(entity => {
        if (system["CheckComponents"]) {
          let check = system["CheckComponents"].every((e, i, a) => {
            return entity[e] !== undefined;
          });
          if (check) {
            system.updateEach(entity);
          }
        } else {
          system.updateEach(entity);
        }
      });
    });
  },
  _hooks: {
    ECS: {
      onRegisterECS: {
        _({ _, _key, _val, cp }) {
          const { registerSystem, registerEntity } = _val;
          const { name } = cp;
          if (registerSystem) {
            this.systems.push(cp);
          }
          if (registerEntity) {
            this.entities[name] = cp;
          }
        }
      }
    }
  }
});

const MovementSystem = {
  name: "MovementSystem",
  _data: {
    CheckComponents: ["position", "velocity"]
  },
  ECS: {
    onRegisterECS: {
      registerSystem: true
    }
  },
  updateEach(entity) {
    const { position, velocity } = entity;
    position.x += velocity.x;
    position.y += velocity.y;
  }
};

const TestEntity1 = {
  name: "test1",
  _data: {
    position: { x: 1, y: 1 },
    velocity: { x: 1, y: 1 }
  },
  ECS: {
    onRegisterECS: {
      registerEntity: true
    }
  }
};
const TestEntity2 = {
  name: "test2",
  _data: {
    position: { x: 1, y: 1 },
    velocity: { x: 10, y: 10 }
  },
  ECS: {
    onRegisterECS: {
      registerEntity: true
    }
  }
};

const _ = new Menhera({
  _hooks: {
    _data,
    _lifeCycle
  },
  _mount: {
    World,
    MovementSystem,
    entities: [TestEntity1, TestEntity2]
  },
  _lifeCycle: {
    lifeCycle: ["start"],
    run: true
  }
});
