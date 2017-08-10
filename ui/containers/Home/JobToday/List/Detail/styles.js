import material from '~/theme/variables/material'

export default {
    wrapItems: {
        width: '100%',
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderBottomColor: material.grayHideColor,
        borderBottomWidth: 1,
        height: 50,
    },
    item: {
        backgroundColor: '#fff',
        width: '100%',
        height: '100%',
        marginLeft: 0,
        paddingHorizontal: 10
    },
    textUp: {
        color: material.redColor,
    },
    itemTime: {
        flex: 1,
        justifyContent: 'center',
        padding: 10,
        paddingLeft: 15

    },
    txttitledate: {
        fontSize: 12,
        color: 'gray'
    },
    date: {
        fontSize: 15,
    }
}