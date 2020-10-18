export interface IDatatableField<T> {
    name: string,
    value?: string | Array<string>,
    // width?: string,
    render?: (row: T, index: number) => JSX.Element,
    onClick?: (row: T) => void,
    calculateTotal?: (items: Array<T>) => number | string,
}