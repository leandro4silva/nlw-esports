import express from "express"
import cors from 'cors'
import { PrismaClient } from '@prisma/client'
import {convertHoursStringToMinutes} from './utils/convert-hour-string-to-minutes'
import { convertMinutesToHoursString } from "./utils/convert-minutes-to-hours-string"

const app = express()
app.use(cors())
app.use(express.json())

const prisma = new PrismaClient({
    log: ['query']
})

app.get('/games', async (request, response) => {

    const games = await prisma.game.findMany({
        include: {
            _count: {
                select: {
                    ads: true
                }
            }
        }
    })

    return response.json(games)
})

app.get('/games/:id/ads', async (request, response) => {
    const { id } = request.params

    const ads = await prisma.ad.findMany({
        select: {
            id: true,
            name: true,
            weekDays: true,
            useVoiceChannel: true,
            yearsPlaying: true,
            hourStart: true,
            hourEnd: true
        },
        where: {
            gameId: id
        },
        orderBy: {
            createdAt: 'desc'
        }
    })

    response.status(200).json(ads.map(ad => {
        return {
            ...ad,
            hourStart: convertMinutesToHoursString(ad.hourStart),
            hourEnd: convertMinutesToHoursString(ad.hourEnd),
            weekDays: ad.weekDays.split(',')
        }
    }))
})

app.post('/games/:id/ads', async (request, response) => {
    const { id } = request.params
    const {
        name,
        yearsPlaying,
        discord,
        weekDays,
        hourStart,
        hourEnd,
        useVoiceChannel
    } = request.body


    const ad = await prisma.ad.create({
        data: {
            gameId: id,
            name,
            yearsPlaying,
            discord,
            weekDays: weekDays.join(','),
            hourStart: convertHoursStringToMinutes(hourStart),
            hourEnd: convertHoursStringToMinutes(hourEnd),
            useVoiceChannel
        }
    })
    return response.json(ad)

})

app.get('/ads/:id/discord', async (request, response) => {
    const { id } = request.params

    const ad = await prisma.ad.findUniqueOrThrow({
        select: {
            discord: true
        }, where: {
            id
        }
    })

    return response.status(200).json({
        discord: ad.discord
    })
})

const PORT = 3333

app.listen(PORT, () => { console.log(`Server running on port ${PORT}`) })