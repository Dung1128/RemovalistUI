import material from '~/theme/variables/material'

export default {
    status: {
        height: 40, 
        width: '100%', 
        justifyContent: 'space-between', 
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
    },
    contentTally: {
        backgroundColor: material.grayTitle
    },
    Title: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        padding: 10,
        backgroundColor: material.grayTitle,
    },
    total: {
        fontSize: 20,
    },
    bottomAction: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        paddingLeft: 30, 
        paddingRight: 30
    },
    txtBold: {
        fontWeight: 'bold'
    },
    itemAction: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    buttonAction: {
        width: 40, 
        height: 40,
        backgroundColor: material.bgColor,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
    },
    txtAction: {
        paddingLeft: 20
    },
    totalCost: {
        paddingRight: 48
    }
}