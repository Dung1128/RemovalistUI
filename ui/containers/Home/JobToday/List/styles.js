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
    }
}