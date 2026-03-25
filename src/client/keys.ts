export let activeKeys = new Set<string>();
export let triggeredKeys = new Set<string>();
export let releasedKeys = new Set<string>();

export function endKeyLoop() {
    triggeredKeys.clear();
    releasedKeys.clear();
}

window.addEventListener("keydown", (e) => {
    e.preventDefault();
    triggeredKeys.add(e.key);
    activeKeys.add(e.key);
});

window.addEventListener("keyup", (e) => {
    e.preventDefault();
    releasedKeys.add(e.key);
    activeKeys.delete(e.key);
});