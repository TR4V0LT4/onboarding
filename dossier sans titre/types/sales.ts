export interface SearchParams {
    [key: string]: string | string[] | undefined
}
  

export type SalesQueryTypes = {
    page: number
    per_page: number
}