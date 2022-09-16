import { SafeAreaView } from 'react-native-safe-area-context'
import { useRoute, useNavigation } from '@react-navigation/native'
import { View, TouchableOpacity, Image, FlatList, Text } from 'react-native';
import { Entypo } from '@expo/vector-icons'
import { useEffect, useState } from 'react';

import { Background } from '../../components/Background';
import { Header } from '../../components/Header';
import { DuoCardProps, DuoCard } from '../../components/DuoCard';

import { GameParams } from '../../@types/navigation';
import logoImg from '../../assets/logo-nlw-esports.png'

import { styles } from "./styles";
import { THEME } from '../../theme';



export function Game() {

    const navigation = useNavigation();
    const route = useRoute()
    const game = route.params as GameParams;

    function handleGoBack(){
        navigation.goBack()
    }

    const [duos, setDuos] = useState<DuoCardProps[]>([])

    useEffect(() => {
        fetch(`http://192.168.0.16:3333/games/${game.id}/ads`)
          .then(response => response.json())
          .then(data => setDuos(data))
    }, [])

    return (
        <Background>
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                   <TouchableOpacity onPress={handleGoBack}>
                        <Entypo name='chevron-thin-left' color={THEME.COLORS.CAPTION_300} size={30}/>
                    </TouchableOpacity>

                    <Image source={logoImg} style={styles.logo}/>

                    <View style={styles.right}></View>
                </View>
                <Image source={{ uri: game.bannerUrl}} style={styles.banner} resizeMode="cover" />
                <Header title={game.title} subtitle='Conecte-se e comece a jogar!'/>

                <FlatList 
                    contentContainerStyle={duos.length > 0 ? styles.contentList :  styles.emptyListContent}
                    style={styles.containerList}
                    showsHorizontalScrollIndicator={false}
                    ListEmptyComponent={() => (
                        <Text style={styles.emptyListText}>Não há aúncios publicados ainda</Text>
                    )}
                    data={duos}
                    keyExtractor={item => item.id}
                    horizontal
                    renderItem={({item}) => (
                        <DuoCard data={item} onConnect={() => {}}/>
                    )}
                
                />

            </SafeAreaView>
        </Background>
    )
}