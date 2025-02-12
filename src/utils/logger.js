export const Logger = {
  log: (...args) => {
    if(__IS_DEV__) {
      console.groupCollapsed('[DEV]', ...args)
      console.trace();
      console.groupEnd();
    }
  },
  error: (...args) => {
    if(__IS_DEV__) {
      console.error(...args);
    }
  }
}