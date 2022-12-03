export interface IStockData{
    c: Number,
    d: Number,
    dp:Number,
    h: Number,
    l: Number,
    o: Number,
    pc:Number,
    t: Number
}

export interface IQuoteData{
    name: string,
    symbol: string,
    quote: IStockData
}