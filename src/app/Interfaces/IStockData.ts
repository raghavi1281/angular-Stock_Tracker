export interface IStockData{
    c: number,
    d: number,
    dp:number,
    h: number,
    l: number,
    o: number,
    pc:number,
    t: number
}

export interface IQuoteData{
    name: string,
    symbol: string,
    quote: IStockData
}