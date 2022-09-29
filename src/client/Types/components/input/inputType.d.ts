type FunctionWithTypedProps<T> = { exec(value: T): void }["exec"];

interface inputContents {
    value: any
    label: string
}
interface propsType {
    className?: string
}

interface selectContents {
    value: any
    label: React.ReactNode
}