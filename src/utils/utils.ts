import { Character, NLPResponse } from '@salutejs/scenario';
import { compliments } from './compliments';

export function getRandomFromArray<T>(arr: T[]): T {
    return arr[Math.floor(arr.length * Math.random())]
}

export function getRandomArrayIndex<T>(arr: T[]): number {
    return Math.floor(arr.length * Math.random())
}

export const closeApp = (message: NLPResponse) => {
    if (message.messageName === 'ANSWER_TO_USER')
        message.payload.items.push({ command: { type: 'close_app'} })
}

export function getUniqCompliment(oldCompliments: number[]) {
    let complimentId = getRandomArrayIndex(compliments)
    let foundCompliment = oldCompliments.find(id => id === complimentId)
    let count = 0

    while (foundCompliment !== undefined && count < compliments.length * 6) {
        count++
        complimentId = getRandomArrayIndex(compliments)
        foundCompliment = oldCompliments.find(id => id === complimentId)
    }
    return {compliment: compliments[complimentId], complimentId}
}

// const youObjNoOfficial = {
//     'Ваш': 'Твой',
//     'Вашего': 'Твоего',
//     'Вас': 'Тебя',
// }
const youObjOfficial = {
    'Ты ': 'Вы ',
    'Твой': 'Ваш',
    'Твоего': 'Вашего',
    'Тебя': 'Вас',
    'Тобой': 'Вами',
    'Твоё': 'Ваше',
    'Твою': 'Вашу',
    'Твои': 'Ваши',
    'К тебе': 'К вам',
    'Скажу тебе': 'Скажу вам',
    'Передать тебе': 'Передать вам',
    'Спасибо тебе': 'Спасибо вам',
    'О тебе': 'О вас',
    'В тебе': 'В вас',
    'Твоему': 'Вашему',
    'Позволь': 'Позвольте',
    'Выглядишь': 'Выглядите',
    'Вызываешь': 'Вызываете',
    'Знаешь': 'Знаете',
    'Затрагиваешь': 'Затрагиваете',
}

export function changeAppealText(text: string, appeal: Character['appeal']): string {
    let keys: string[]
    let newText: string = text
    if (appeal === 'official') {
        keys = Object.keys(youObjOfficial)
        keys.forEach((key) => {
            if (newText.toLowerCase().includes(key.toLowerCase())) {
                //@ts-ignore
                newText = newText.replace(key, youObjOfficial[key])
                //@ts-ignore
                newText = newText.replace(key.toLowerCase(), youObjOfficial[key].toLowerCase())
            }
            if (newText.toLowerCase().includes(key.toLowerCase())) {
                //@ts-ignore
                newText = newText.replace(key, youObjOfficial[key])
                //@ts-ignore
                newText = newText.replace(key.toLowerCase(), youObjOfficial[key].toLowerCase())
            }
            if (newText.toLowerCase().includes(key.toLowerCase())) {
                //@ts-ignore
                newText = newText.replace(key, youObjOfficial[key])
                //@ts-ignore
                newText = newText.replace(key.toLowerCase(), youObjOfficial[key].toLowerCase())
            }
        })
    }
    return newText
}

const ssmlObject = {
    'целую': 'целу\'ю'
}

export function addSSML(text: string): string {
    let keys: string[]
    let newText: string = text
    keys = Object.keys(ssmlObject)
    keys.forEach((key) => {
        if (newText.toLowerCase().includes(key.toLowerCase())) {
            //@ts-ignore
            newText = newText.replace(key, ssmlObject[key])
            //@ts-ignore
            newText = newText.replace(key.toLowerCase(), ssmlObject[key].toLowerCase())
        }
    })
    return newText
}

