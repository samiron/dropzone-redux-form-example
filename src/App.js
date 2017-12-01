import React from 'react';
import FileUploader from './FileUploader';

class App extends React.Component {
  render() {
    const initialValues = {
      single_field: "initial",
      uploaded_file_array: []
    }
    return <FileUploader initialValues={initialValues} />;
  }
}

export default App;