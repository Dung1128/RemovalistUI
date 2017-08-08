import material from '~/theme/variables/material';

export default {
    container: {
        backgroundColor: '#ed502b', 
        borderBottomColor: '#ed502b'
    },
    textHeader: {
        color: '#fff',
        fontSize: 18,
    },
    content: {
         backgroundColor: material.grayTitle,
    },
    titGeneral: {
        padding: 10,
        backgroundColor: material.grayTitle,
        flexDirection: 'row',
    },
    titTitBold: {
        fontWeight: 'bold',
        flex: 3
    },
    titPrice: {
        flex: 1,
        fontWeight: 'bold',
    },
    iconsAdd: {
        color: material.bgColor,
        fontSize: 22,
        position: 'absolute',
        right: 10,
        top: 10

    },
    footer: {
        backgroundColor: material.bgColor,
        justifyContent: 'center',
    },
    txtFooter: {
        fontSize: 20,
        color: '#fff'
    },
    iconFooter: {
        fontSize: 30, 
        color: '#fff',
        position: 'absolute',
        top: 10,
        right: 10
    },
    totalPrice: {
        padding: 10,
        backgroundColor: '#fff',
        flexDirection: 'row',
    },
    txtTotal: {
        flex: 3,
        fontSize: 20
    },
    txtPriceTotal: {
        flex: 1,
        fontSize: 20,
        color: material.bgColor
    }
};
