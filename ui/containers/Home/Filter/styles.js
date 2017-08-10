import material from '~/theme/variables/material';
import { fontMaker } from '~/ui/utils';
export default {
    titGeneral: {
        padding: 10,
        backgroundColor: material.grayTitle,
    },
    dropdownListItemText: {
    color: '#000',
    fontWeight: '100',
  },
  dropdownListItem: {
    marginLeft: 15,
    marginRight: 15,
    borderBottomColor: material.grayTitle,
    borderBottomWidth: 0.5, 
    borderStyle: 'solid',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  radioButton: {
      color: material.redColor
  }
};
