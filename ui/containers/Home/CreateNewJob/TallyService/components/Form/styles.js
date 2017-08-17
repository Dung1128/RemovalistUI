import material from '~/theme/variables/material';
export default {

    border: {
        borderWidth: 0.5,
        borderColor: material.grayTitle
    },
    wrapItem: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        height: 50,
        borderBottomColor: material.grayTitle,
        borderBottomWidth: 0.5
    },
    Item: {
        flex: 1,
        borderRightWidth: 0.5,
        borderRightColor: material.grayTitle,
        padding: 10,
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
        justifyContent: 'center',
    },
    button: {
        position: 'absolute',
        right: 10,
        top: 12
    },

    content: {
        width: 80,
    },
};
