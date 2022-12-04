export interface ISentiment{
    month: number;
    change: number;
    mspr: number;
}

export interface ISentimentResponse{
    data:ISentiment[];
}