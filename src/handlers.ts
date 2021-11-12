import { SaluteHandler } from '@salutejs/scenario'
import axios from 'axios'
import * as dictionary from './system.i18n'
import { Aphorism } from './types'

export const runAppHandler: SaluteHandler = ({ req, res }, dispatch) => {
    dispatch && dispatch(['Hello'])
}

export const noMatchHandler: SaluteHandler = ({ req, res }) => {
    const keyset = req.i18n(dictionary)
    res.setPronounceText(keyset('404'))
    res.appendBubble(keyset('404'))
}

export const helloHandler: SaluteHandler = ({ req, res }) => {
    const keyset = req.i18n(dictionary)
    const responseText = keyset('Привет')
    res.setPronounceText(responseText)
    res.appendBubble(responseText)
    res.setAutoListening(true)
    res.appendSuggestions(['Да', 'Нет'])
}

export const aphorismHandler: SaluteHandler = async ({ res }) => {

    const { data } = await axios.get<Aphorism>('https://api.forismatic.com/api/1.0/?method=getQuote&format=json&jsonp=parseQuote&lang=ru')
    console.log(data)

    res.appendBubble(`«${data.quoteText}»${data.quoteAuthor ? ' ©\n' + data.quoteAuthor : ''}`)
    res.setPronounceText(data.quoteText + data.quoteAuthor)
    res.appendSuggestions(['Ещё', 'Хватит'])
}

export const thanksHandler: SaluteHandler = ({ req, res }) => {
    const keyset = req.i18n(dictionary)

    const responseText = keyset('Спасибо')
    res.setPronounceText(responseText)
    res.appendBubble(responseText)
    res.appendSuggestions(['Ещё', 'Хватит'])
}


