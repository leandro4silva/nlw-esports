import * as Dialog from '@radix-ui/react-dialog'
import * as Checkbox from '@radix-ui/react-checkbox'
import * as Select from '@radix-ui/react-select'
import * as ToggleGroup from '@radix-ui/react-toggle-group';

import axios from 'axios'

import { Input } from '../Input'
import { CaretDown, CaretUp, Check, GameController } from 'phosphor-react'
import { useEffect, useState, FormEvent } from 'react'




interface Game {
    id: string,
    title: string,
    
}

export function CreateAdModal() {
    
    
    const [games, setGames] = useState<Game[]>([])

    const [weekDays, setWeekDays] = useState<string[]>([])
    const [useVoiceChannel, setUseVoiceChannel] = useState(false)

    useEffect(() => {
        axios('http://localhost:3333/games')
            .then(response => {
                setGames(response.data)
            })
    }, [])

    async function handleCreateAd(event: FormEvent) {
        event.preventDefault()

        const formData = new FormData(event.target as HTMLFormElement)
        const data = Object.fromEntries(formData)

        console.log(data)

        try {
            await axios.post(`http://localhost:3333/games/${data.game}/ads`, {
                name: data.name,
                yearsPlaying: Number(data.yearPlaying),
                discord: data.discord,
                weekDays: weekDays.map(Number),
                hourStart: data.hourStart,
                hourEnd: data.hourEnd,
                useVoiceChannel: useVoiceChannel
            })

            alert('Anuncio criado com sucesso')
            
        } catch (err) {
            alert('Erro ao criar o anuncio')
        }
    }

    return (
        <Dialog.Portal>
            <Dialog.Overlay className='bg-black/60 inset-0 fixed ' />
            <Dialog.Content className={`fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-black/25`}>
                <Dialog.Title className='text-3xl font-black'>
                    Publique um anúncio
                </Dialog.Title>
                <form onSubmit={handleCreateAd} action="" className='mt-8 flex flex-col gap-4'>
                    <div className='flex flex-col gap-2'>
                        <Select.Root name='game'>
                            <Select.Trigger className='bg-zinc-900 py-3 px-4 text-white rounded flex items-center justify-between'>
                                <Select.Value placeholder='Selecione o game que deseja jogar' />
                                <Select.Icon>
                                    <CaretDown size={24} />
                                </Select.Icon>
                            </Select.Trigger>
                            <Select.Portal>

                                <Select.Content>
                                    <Select.Viewport className='bg-zinc-900 py-3 px-4 text-white rounded '>
                                        {
                                            games.map(item => {
                                                return (
                                                    <Select.Item key={item.id} value={item.id} className='cursor-pointer'>
                                                        <Select.ItemText>{item.title}</Select.ItemText>
                                                        <Select.ItemIndicator />
                                                    </Select.Item>
                                                )
                                            })
                                        }
                                        <Select.Separator />
                                    </Select.Viewport>
                                </Select.Content>
                            </Select.Portal>
                        </Select.Root>
                    </div>

                    <div className='flex flex-col gap-2'>
                        <label htmlFor="name">Seu nome (ou nickname)</label>
                        <Input id='name' name='name' placeholder='Como te chamam dentro do game?' />
                    </div>

                    <div className='grid grid-cols-2 gap-6'>
                        <div className='flex flex-col gap-2'>
                            <label htmlFor="yearPlaying">Joga há quantos anos?</label>
                            <Input id='yearsPlaying' name='yearPlaying' type="number" placeholder='Tudo bem ser ZERO' />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <label htmlFor="discord">Qual seu Discord?</label>
                            <Input id='discord' name='discord' placeholder='Usuario#0000' />
                        </div>
                    </div>

                    <div className='flex flex-col gap-6'>
                        <div className='flex flex-col gap-2'>
                            <label htmlFor="weekDays">Quando costuma jogar?</label>

                            <ToggleGroup.Root
                                type='multiple'
                                className='flex gap-1'
                                onValueChange={setWeekDays}
                                value={weekDays}
                            >
                                <ToggleGroup.Item
                                    className={`px-4 py-2 rounded ${weekDays.includes('0') ? 'bg-violet-500' : 'bg-[#18181B]'}`}
                                    title='Domingo' value='0'
                                >
                                    D
                                </ToggleGroup.Item>


                                <ToggleGroup.Item
                                    className={`px-4 py-2 rounded ${weekDays.includes('1') ? 'bg-violet-500' : 'bg-[#18181B]'}`}
                                    title='Segunda' value='1'
                                >
                                    S
                                </ToggleGroup.Item>
                                <ToggleGroup.Item
                                    className={`px-4 py-2 rounded ${weekDays.includes('2') ? 'bg-violet-500' : 'bg-[#18181B]'}`}
                                    title='Terça' value='2'
                                >
                                    T
                                </ToggleGroup.Item>
                                <ToggleGroup.Item
                                    className={`px-4 py-2 rounded ${weekDays.includes('3') ? 'bg-violet-500' : 'bg-[#18181B]'}`}
                                    title='Quarta' value='3'
                                >
                                    Q
                                </ToggleGroup.Item>
                                <ToggleGroup.Item
                                    className={`px-4 py-2 rounded ${weekDays.includes('4') ? 'bg-violet-500' : 'bg-[#18181B]'}`}
                                    title='Quinta' value='4'
                                >
                                    Q
                                </ToggleGroup.Item>
                                <ToggleGroup.Item
                                    className={`px-4 py-2 rounded ${weekDays.includes('5') ? 'bg-violet-500' : 'bg-[#18181B]'}`}
                                    title='Sexta' value='5'
                                >
                                    S
                                </ToggleGroup.Item>
                                <ToggleGroup.Item
                                    className={`px-4 py-2 rounded ${weekDays.includes('6') ? 'bg-violet-500' : 'bg-[#18181B]'}`}
                                    title='Sabado' value='6'
                                >
                                    S
                                </ToggleGroup.Item>
                            </ToggleGroup.Root>

                        </div>
                        <div className='flex flex-col gap-2'>
                            <label htmlFor="hourStart">Qual horario do dia?</label>
                            <div className='grid grid-cols-2 gap-2'>
                                <Input type="time" placeholder='De' id='hourStart' name='hourStart' />
                                <Input type="time" placeholder='Ate' id='hourEnd' name='hourEnd' />
                            </div>
                        </div>
                    </div>

                    <div className='flex items-center gap-2 text-sm'>
                        <Checkbox.Root onCheckedChange={(checked) => {
                            if (checked == true) {
                                setUseVoiceChannel(true)
                            } else {
                                setUseVoiceChannel(false)
                            }
                        }} name='useVoiceChannel' className='w-6 h-6 rounded bg-zinc-900 grid place-content-center'>
                            <Checkbox.Indicator >
                                <Check className='text-emerald-400' size={16} />
                            </Checkbox.Indicator>
                        </Checkbox.Root>
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
    )
}