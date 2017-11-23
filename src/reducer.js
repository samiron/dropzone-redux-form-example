
const initialState = {someting: "nothing"};

const deleteFileFromState = (formName, fieldName) => {

}


export const ExampleReducer = (state = initialState, action) => {
  console.log("Example reducer: ", state, action);
  switch (action.type) {
    case "FAILED_UPLOADING":{
      const fieldNameWithIndex = action.meta.field;
      const formName = action.meta.form;
      const fieldName = fieldNameWithIndex.replace(/\[\d+\]/, '');
      console.log("Accesing the state object: ", state['form'][formName][`${fieldName}`]);
      // deleteFileFromState(formName, fieldName);
      return state;
    }
    // case t.SHOW_DELETE_PANEL:
    //   return Object.assign({}, state, {
    //     isShowDeletePanel: action.showDeletePanel,
    //     documentIndex: action.documentIndex,
    //   });

    default:
      return state;
  }
};

export default ExampleReducer;