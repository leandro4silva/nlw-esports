import './styles/main.css'

import { useState, useEffect } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { CreateAdBanner } from './components/CreateAdBanner'


import logoImg from './assets/logo-esports.svg'

import { GameBanner } from './components/GameBanner'
import { CreateAdModal} from './components/CreateAdModal'

import axios from 'axios'


interface Game{
    id: string,
    title: string,
    bannerUrl: string,
    _count: {
        ads: number
    }
}


export function App(){
    

    const [games, setGames] = useState<Game[]>([])


    useEffect(() => {
        axios('http://localhost:3333/games')
            .then(response => {
                setGames(response.data)
            })
    }, [])

    return (
        <div className='max-w-[1344] mx-auto flex flex-col items-center justify-center my-20'>
            <img src={logoImg} alt="Logo" />

            <h1 className='text-6xl text-white font-black mt-20'>
                Seu <span className='text-transparent bg-nlw-gradient bg-clip-text'>duo</span> está aqui.
            </h1>

            <div className='grid grid-cols-6 gap-6 mt-16 px-40'>
                {
                    games.map(item => {
                        return (
                            <GameBanner 
                            key={item.id} 
                            bannerUrl={item.bannerUrl} 
                            title={item.title} adsCount={item._count.ads}/>
                        )
                    })
                }
            </div>
            <div className='w-full px-40'>

                <Dialog.Root>
                    <CreateAdBanner />
                    <CreateAdModal/>
                </Dialog.Root>
            </div>
            
        </div>
    )
}
