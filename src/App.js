import React from 'react';
import FileUploader from './FileUploader';

class App extends React.Component {
  render() {
    const initialValues = {
      uploaded_files: [],
      uploaded_file_array: [{selected:false}]
    }
    return <FileUploader initialValues={initialValues} />;
  }
}

export default App;