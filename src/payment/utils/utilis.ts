export function wait(delay: number) {
  const time: number = Date.now() + delay
  let toRich = Date.now()
  while (toRich < time) {
    toRich = Date.now()
  }
}
