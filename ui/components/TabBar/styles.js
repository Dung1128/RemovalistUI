import platform from '~/theme/variables/platform';
import { fontMaker } from '~/ui/utils';

export default {
    hdMenu: {
        // width: platform.fullWidth / 2,
        flex: 1,
        height: 30,        
        // flexDirection: 'row',
        // alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },    
    itemMenu: {
        width: '100%',
        justifyContent: 'center',
        height: '100%',
        alignItems: 'center',
    },
    get itemMenuActive() {
        return {
            ...this.itemMenu,
            backgroundColor: 'white',
        }
    },
    textMenuActive: {
        fontSize: 14,
        color: 'red',
        paddingTop: 0
    },
    textMenu: {
        fontSize: 14,
        color: 'white',
        paddingTop: 0
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
