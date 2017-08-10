import material from '~/theme/variables/material';

export default {
    containers: {
        paddingTop: 10,
        backgroundColor: material.grayTitle,
        marginBottom: 10,
        width: '100%'
    },  
    itemList: {
        borderBottomWidth: 0.5,
        borderBottomColor: material.grayColor,
        backgroundColor: '#fff',
        padding: 10
    },
    bottom: {
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        paddingTop: 10
    },
    textbottom: {
        color: material.grayColor,
        fontSize: 12,
    }
};
