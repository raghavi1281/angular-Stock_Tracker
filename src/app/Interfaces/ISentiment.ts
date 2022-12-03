export interface ISentiment{
    month: Number;
    change: Number;
    mspr: Number;
}

export interface ISentimentResponse{
    data:ISentiment[];
}