export default (msec: number) => new Promise<void>(resolve => setTimeout(resolve, msec));