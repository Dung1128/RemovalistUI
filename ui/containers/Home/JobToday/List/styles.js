import material from '~/theme/variables/material'

export default {
    wrapItems: {
        width: '100%',
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderBottomColor: material.grayHideColor,
        borderBottomWidth: 1,
        height: 70,
    },
    item: {
        backgroundColor: '#fff',
        width: '100%',
        height: '100%',
        marginLeft: 0,
        paddingHorizontal: 10
    },
    hiddenButton: {
        alignItems: 'center',
        width: '100%',
        borderRadius: 0,
        justifyContent: 'center',
        height: 70
    },
    itemList: {
        flexDirection: 'row',
    },
    statusColor: {
        width: 5,
        backgroundColor: 'red',
        borderRadius: 5
    },
    address: {

    },
    itemsJob: {
        paddingHorizontal: 10,
        paddingVertical: 5
    },
    bottom: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 10,
        width: material.deviceWidth - 15,
        alignItems: 'center',
        paddingRight: 10
    },
    textbottom: {
        fontSize: 14,
    }
}