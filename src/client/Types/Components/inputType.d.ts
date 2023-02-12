type FunctionWithTypedProps<T> = { exec(value: T): void }["exec"];

interface propsType {
    class?: string
}

interface selectContents<T = any> {
    value: T
    label: React.ReactNode
}

type selectContentsArray<T = any> = Array<selectContents<T>>