import platform from '~/theme/variables/platform';
import { fontMaker } from '~/ui/utils';

export default {
    hdMenu: {
        width: platform.fullWidth - 50,
        height: 25,
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 5,
        flexDirection: 'row',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    itemMenu: {
        flex: 1,
        justifyContent: 'center',
        height: '100%',
        alignItems: 'center',
        paddingBottom: 3,
        paddingHorizontal: 5,
    },
    get itemMenuActive() {
        return {
            ...this.itemMenu,
            backgroundColor: 'white',
        }
    },
    textMenuActive: {
        ...fontMaker({
            weight: 'Bold',
        }),
        fontSize: 12,
        color: 'red'
    },
    textMenu: {
        fontSize: 12,
        color: 'white',
        ...fontMaker({
            weight: 'Bold',
        }),
    },
    txtTitBold: {
        color: platform.titleFontColor,
        fontSize: 16,
        ...fontMaker({
            weight: 'Normal',
        }),
    },
    txtNormal: {
        fontSize: 16,
        color: platform.textGray
    },
    txtInf: {
        color: platform.titleFontColor,
        fontSize: 16

    }
};
