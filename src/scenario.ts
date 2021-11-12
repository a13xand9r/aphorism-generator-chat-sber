import { SmartAppBrainRecognizer } from '@salutejs/recognizer-smartapp-brain'
import {
    createIntents,
    createMatchers,
    createSaluteRequest,
    createSaluteResponse,
    createScenarioWalker,
    createSystemScenario,
    createUserScenario,
    NLPRequest,
    NLPResponse,
    SaluteRequest
} from '@salutejs/scenario'
import { SaluteMemoryStorage } from '@salutejs/storage-adapter-memory'
import { aphorismHandler, helloHandler, noMatchHandler, runAppHandler, thanksHandler } from './handlers'
import model from './intents.json'
import { closeApp } from './utils/utils'
// require('dotenv').config()

const storage = new SaluteMemoryStorage()
const intents = createIntents(model.intents)
const { text } = createMatchers<SaluteRequest, typeof intents>()

const userScenario = createUserScenario({
    Hello: {
        match: text('привет'),
        handle: helloHandler,
        children: {
            Yes: {
                match: req => text('да', {normalized: true})(req) || req.message.normalized_text.includes('начать') || req.message.normalized_text.includes('давать'),
                handle: aphorismHandler
            },
            No: {
                match: text('нет', {normalized: true}),
                handle: ({res}) => {
                    res.appendBubble('Тогда до встречи')
                    res.setPronounceText('Тогда до встречи')
                    res.finish()
                    closeApp(res.message)
                }
            }
        }
    },
    Aphorism: {
        match: req => {
            return req.message.original_text.toLowerCase().includes('еще') ||
                req.message.original_text.toLowerCase().includes('дальше') ||
                req.message.original_text.toLowerCase().includes('ещё') ||
                req.message.original_text.toLowerCase().includes('цитата') ||
                req.message.original_text.toLowerCase().includes('афоризм')
        },
        handle: aphorismHandler
    },
    Thanks: {
        match: req => {
            return req.message.original_text.toLowerCase().includes('спасибо') || req.message.original_text.toLowerCase().includes('благодарю')
        },
        handle: thanksHandler
    },
})

const systemScenario = createSystemScenario({
    RUN_APP: runAppHandler,
    NO_MATCH: noMatchHandler
})

const scenarioWalker = createScenarioWalker({
    systemScenario,
    userScenario
})

export const handleNlpRequest = async (request: NLPRequest): Promise<NLPResponse> => {
    const req = createSaluteRequest(request)
    const res = createSaluteResponse(request)
    const sessionId = request.uuid.sub
    const session = await storage.resolve(sessionId)
    await scenarioWalker({ req, res, session })

    await storage.save({ id: sessionId, session })

    return res.message
}