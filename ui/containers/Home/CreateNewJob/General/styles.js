import material from '~/theme/variables/material';

export default {
    container: {
        backgroundColor: material.redColor, 
        borderBottomColor: material.redColor
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
        justifyContent: 'space-between'
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
        color: '#fff',
        position: 'absolute',
        right: 10
    },
    Items: {
        backgroundColor: '#fff',
        height: 50,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center'
    },
    txtForm: {
        fontSize: 16,
        paddingLeft: 15
    },
    down: {
        position: 'absolute',
        right: 30,
        // top: 10
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
    },
    titBold: {
        fontWeight: 'bold'
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
        borderRadius: 3
    },
};
