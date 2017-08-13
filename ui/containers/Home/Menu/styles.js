import material from '~/theme/variables/material';

export default {
    iconMap: {
        color: '#8796A0',
        fontSize: material.deviceWidth * 0.06,
        marginTop: 10
    },
    iconRight: {
        alignSelf: 'center',
        width: '25%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    container: {
        flex: 1,
        paddingTop: 15,
        paddingBottom: 30,
        borderBottomWidth: 2,
        borderBottomColor: '#F3F6F7',
        // shadowColor: '#A2AEC7',
        // shadowOffset: { width: 0, height: 2 },
        // shadowOpacity: 0.5,
        // elevation: 1
        paddingLeft: 10
    },
    wrapInfo: {
        borderRightWidth: 2,
        borderRightColor: '#F3F6F7',
        width: '75%',
        paddingLeft: material.deviceWidth * 0.03
    },
    infoName: {
        color: '#000',
        fontSize: material.deviceWidth * 0.045,
        fontWeight: 'bold'
    },
    infoPhone: {
        color: '#8796A0',
        fontSize: material.deviceWidth * 0.04
        // alignSelf: 'center'
    },
    price: {
        color: '#1B9DE6',
        fontSize: material.deviceWidth * 0.045,
        marginTop: 10
    },
    infoAddress: {
        color: '#8796A0',
        fontSize: material.deviceWidth * 0.045,
        textAlign: 'center'
    },
    iconForm: {
        marginTop: 2,
        width: material.deviceWidth * 0.1
    },
    iconCall: {
        color: '#fff',
        fontSize: material.deviceWidth * 0.09
    },
    itemList: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 5
    },
    itemText: {
        color: '#000',
        fontSize: material.deviceWidth * 0.045,
        padding: 8
    },
    viewColor: {
        marginLeft: 10,
        width: 10,
        height: 25,
    },
    statusItem: {
        marginLeft: 20,
        marginRight: 10,
        height: '70%'
    },
    website: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 20
    }
};
