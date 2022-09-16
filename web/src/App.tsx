import './styles/main.css'

import { useState, useEffect } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { CreateAdBanner } from './components/CreateAdBanner'
import { GameController } from 'phosphor-react'

import logoImg from './assets/logo-esports.svg'

import { GameBanner } from './components/GameBanner'
import { Input } from './components/Input'

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
        fetch('http://localhost:3333/games')
        .then(response => response.json())
        .then(data => {
            setGames(data)
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
                    <Dialog.Portal>
                        <Dialog.Overlay className='bg-black/60 inset-0 fixed'/>
                        <Dialog.Content className='fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-black/25'>
                            <Dialog.Title className='text-3xl font-black'>
                                Publique um anúncio
                            </Dialog.Title>
                                <form action="" className='mt-8 flex flex-col gap-4'>
                                    <div className='flex flex-col gap-2'>
                                        <label className='font-semibold' htmlFor="game">Qual o game?</label>
                                        <Input 
                                            id='game' 
                                            placeholder='Selecione o game que deseja jogar' 
                                        />
                                    </div>

                                    <div className='flex flex-col gap-2'>
                                        <label htmlFor="name">Seu nome (ou nickname)</label>
                                        <Input id='name' placeholder='Como te chamam dentro do game?' />
                                    </div>

                                    <div className='grid grid-cols-2 gap-6'>
                                        <div className='flex flex-col gap-2'>
                                            <label htmlFor="yearPlaying">Joga há quantos anos?</label>
                                            <Input id='yearPlaying' type="number" placeholder='Tudo bem ser ZERO' />
                                        </div>
                                        <div className='flex flex-col gap-2'>
                                            <label htmlFor="discord">Qual seu Discord?</label>
                                            <Input id='discord' placeholder='Usuario#0000'/>
                                        </div>
                                    </div>

                                    <div className='flex flex-col gap-6'>
                                        <div className='flex flex-col gap-2'>
                                            <label htmlFor="weekDays">Quando costuma jogar?</label>

                                            <div className='flex gap-1'>
                                                <button className='px-4 py-2 bg-[#18181B]' title='Domingo'>D</button>
                                                <button className='px-4 py-2 bg-[#18181B]' title='Segunda'>S</button>
                                                <button className='px-4 py-2 bg-[#18181B]' title='Terça'>T</button>
                                                <button className='px-4 py-2 bg-[#18181B]' title='Quarta'>Q</button>
                                                <button className='px-4 py-2 bg-[#18181B]' title='Quinta'>Q</button>
                                                <button className='px-4 py-2 bg-[#18181B]' title='Sexta'>S</button>
                                                <button className='px-4 py-2 bg-[#18181B]' title='Sabado'>S</button>
                                            </div>
                                        </div>
                                        <div className='flex flex-col gap-2'>
                                            <label htmlFor="hourStart">Qual horario do dia?</label>
                                            <div className='grid grid-cols-2 gap-2'>
                                                <Input type="time" placeholder='De' id='hourStart' />
                                                <Input type="time" placeholder='Ate' id='hourEnd' />
                                            </div>
                                        </div>
                                    </div>

                                    <div className='flex items-center gap-2 text-sm'>
                                        <Input type="checkbox" />
                                        Costumo me conectar ao chat de voz
                                    </div>

                                    <footer className='grid grid-cols-2 gap-4 justify-items-end mt-8'>
                                        <Dialog.Close 
                                            type='button'
                                            className='px-5 py-3 font-semibold bg-zinc-500 hover:bg-zinc-600 rounded-md text-white'
                                        >
                                            Cancelar
                                        </Dialog.Close>
                                        <button 
                                            className='px-5 py-3 font-semibold flex items-center justify-center gap-3 bg-violet-500 rounded-md hover:bg-violet-600' 
                                            type='submit'>
                                            <GameController size={24} />
                                            Encontrar duo
                                        </button>
                                    </footer>
                                </form>
                        </Dialog.Content>
                    </Dialog.Portal>
                </Dialog.Root>
            </div>
            
        </div>
    )
}
