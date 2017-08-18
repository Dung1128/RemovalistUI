import material from '~/theme/variables/material';
export default {

    border: {
        borderWidth: 0.5,
        borderColor: material.grayTitle
    },
    wrapItem: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        height: 60,
        borderBottomColor: material.grayTitle,
        borderBottomWidth: 0.5
    },
    wrapContent: {
        flexDirection: 'row',
        borderBottomColor: material.grayTitle,
        borderBottomWidth: 0.5,
        paddingLeft: 10,
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        alignItems: 'center',
        height: 60,
    },
    Item: {
        flex: 1,
        padding: 0,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 10,
        justifyContent: 'center',
    },
    borderLeft: {
        flex: 0.5,
        borderLeftWidth: 0.5,
        borderLeftColor: material.grayTitle,
        height: '100%',
        flexDirection: 'row',
        alignItems: 'center',
    },
    button: {
        position: 'absolute',
        right: 10,
        top: 12
    },

    content: {
        width: 80,
    },

    titPrice: {
        flex: 1,
        fontWeight: 'bold',
    },
    money: {
        justifyContent: 'space-between',
        width: '20%'
    }
};
