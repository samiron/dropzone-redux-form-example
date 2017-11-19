import React from 'react';
import FileUploader from './FileUploader';

class App extends React.Component {
  render() {
    const initialValues = {
      uploaded_files: []
    }
    return <FileUploader initialValues={initialValues} />;
  }
}

export default App;