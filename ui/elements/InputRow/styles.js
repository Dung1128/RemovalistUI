import material from '~/theme/variables/material';

export default {
    wrapContent: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        paddingLeft: 20,
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    iconAdd: {
        color: '#fff',
    },
    buttonAdd: {
        width: 23,
        height: 23,
        backgroundColor: material.redColor,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 3,
        position: 'absolute',
        right: 10
    },
    error: {
        borderWidth: 1,
        borderColor: material.redColor,
        height: 50,
        marginHorizontal: 10,
    },
    noerror: {
        height: 50,
        marginHorizontal: 10,
    }
};
