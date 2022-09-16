import { StyleSheet } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { THEME } from "../../theme";

export const styles = StyleSheet.create({
    container: {
        width: 200,
        height: 292,
        backgroundColor: THEME.COLORS.SHAPE,
        borderRadius: 8,
        padding: 20,
        marginRight: 16
    },
    button:{
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 25,
        paddingVertical: 9.5,
        marginTop: 16,
        borderRadius: 6,
        backgroundColor: THEME.COLORS.PRIMARY,
    },
    textButton: {
        marginLeft: 8,
        color: THEME.COLORS.TEXT,
        fontWeight: '600',
        lineHeight: 17,
        fontSize: THEME.FONT_SIZE.SM
    }
})