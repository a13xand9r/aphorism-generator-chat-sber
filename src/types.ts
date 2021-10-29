import {
    AppState,
    SaluteRequest,
    SaluteRequestVariable
} from '@salutejs/scenario'


export type CustomRequest = SaluteRequest<SaluteRequestVariable, AppState>

export type Aphorism = {
    quoteText: string
    quoteAuthor: string
    quoteLink: string
}