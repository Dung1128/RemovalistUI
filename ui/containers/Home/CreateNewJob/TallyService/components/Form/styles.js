import material from '~/theme/variables/material';
export default {

    border: {
        borderWidth: 0.5,
        borderColor: material.grayTitle
    },
    Item: {
        flex: 1,
        borderRightWidth: 1,
        borderRightColor: material.grayTitle,
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 10,
        justifyContent: 'center',
    },
    button: {
        position: 'absolute',
        right: 10,
    }
};
