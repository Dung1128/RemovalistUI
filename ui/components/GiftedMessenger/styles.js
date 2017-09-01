import material from '~/theme/variables/material'
export default {

    container: {
        flex: 1,
        backgroundColor: '#E9EDEF',
    },
    listView: {
        height: material.deviceHeight - 60,
        marginBottom: 40
    },
    textInputContainer: {
        position: 'absolute',
        bottom: 0,
        flexDirection: 'row',
        height: 50,
        alignItems: 'center',
        padding: 5,
        paddingVertical: 10,
        backgroundColor: '#fbfbfb',
        width: '100%'
    },
    textInputContent: {
        flexDirection: 'row', flex: 1, alignItems: 'center', borderWidth: 1,
        borderColor: '#b5b5b5',
        paddingVertical: 2,
        paddingHorizontal: 5,
        margin: 5,
    },
    textInput: {
        alignSelf: 'center',
        height: '100%',
        width: '100%',
        backgroundColor: '#FFF',
        color: '#000',
        flex: 1,
        padding: 0,
        margin: 0,
        fontSize: 15,
    },
    sendButton: {
        marginTop: 5,
        marginLeft: 10,
        height: 35,
    },
    name: {
        color: '#aaaaaa',
        fontSize: 12,
        marginLeft: 60,
        marginBottom: 5,
    },
    date: {
        color: '#aaaaaa',
        fontSize: 12,
        textAlign: 'center',
        fontWeight: 'bold',
        marginBottom: 8,
    },
    rowContainer: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    imagePosition: {
        height: 30,
        width: 30,
        alignSelf: 'flex-end',
        marginLeft: 8,
        marginRight: 8,
    },
    image: {
        alignSelf: 'center',
        borderRadius: 15,
    },
    imageLeft: {
    },
    imageRight: {
    },
    bubble: {
        borderRadius: 15,
        paddingLeft: 14,
        paddingRight: 14,
        paddingBottom: 10,
        paddingTop: 8,
        flex: 1,
    },
    text: {
        color: '#000',
    },
    textLeft: {
    },
    textRight: {
        color: '#fff',
    },
    bubbleLeft: {
        marginRight: 70,
        backgroundColor: '#fff',
    },
    bubbleRight: {
        marginLeft: 70,
        backgroundColor: material.redColor,
    },
    bubbleError: {
        backgroundColor: '#e01717'
    },
    link: {
        color: '#007aff',
        textDecorationLine: 'underline',
    },
    linkLeft: {
        color: '#000',
    },
    linkRight: {
        color: '#fff',
    },
    errorButtonContainer: {
        marginLeft: 8,
        alignSelf: 'center',
        justifyContent: 'center',
        backgroundColor: '#e6e6eb',
        borderRadius: 15,
        width: 30,
        height: 30,
    },
    errorButton: {
        fontSize: 22,
        textAlign: 'center',
    },
    status: {
        color: '#aaaaaa',
        fontSize: 12,
        textAlign: 'right',
        marginRight: 15,
        marginBottom: 10,
        marginTop: -5,
    },
    loadEarlierMessages: {
        height: 44,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadEarlierMessagesButton: {
        fontSize: 14,
    },
    spacer: {
        width: 10,
    },
    timeLeft: {
        marginTop: 5,
        fontSize: 11,
        color: material.grayColor
    },
    timeRight: {
        marginTop: 5,
        fontSize: 11,
        color: 'white',
        alignSelf: 'flex-end',
    }

}