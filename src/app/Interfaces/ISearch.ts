export interface ISearchresult{
  description: string,
  displaySymbol: string,
  symbol: string,
  type: string
}

export interface ISearchResponse{
  count: number,
  result: ISearchresult[]
}