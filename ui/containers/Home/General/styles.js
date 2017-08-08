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
    Items: {
        backgroundColor: '#fff',
        height: 50,
        width: '100%',
        flexDirection: 'row',
    },
    iconsTruck: {
        fontSize: 25
    },
    txtForm: {
        fontSize: 16,
        paddingLeft: 15
    },
    down: {
        fontSize: 25,
        position: 'absolute',
        right: 10,
        top: 10
    },
    statusColor: {
        height: '100%',
        width: 5,
        backgroundColor: 'red',
        borderRadius: 5
    },
    stylemodal: {
        backgroundColor: 'rgba(0,0,0,0.1)',
        flex:1,
        justifyContent:'center',
        alignItems:'center', 
        marginLeft: 20, 
        marginRight: 20,
    },
    truckItem: {
        justifyContent:'center',
        alignItems:'center', 
    },
    itemTime: {
        flex: 1,
        justifyContent: 'center',
        padding: 10
   
    },
    txttitledate: {
        fontSize: 12,
        color: 'gray'
    },
    date: {
        fontSize: 15,
    }
};
