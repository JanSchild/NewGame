import { world } from "./ClientWorld.js";
export let hero = {
    x: 200,
    y: 200,
    id: "theHero"
};
world.sync([hero]);
