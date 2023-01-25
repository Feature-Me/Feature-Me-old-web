type FunctionWithType<T, U = void> =
    ((...args: T[]) => U) |
    ((...args: T[]) => Promise<U>);