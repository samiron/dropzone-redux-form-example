import React, { Component, PropTypes, } from 'react';
import { reduxForm, Field } from 'redux-form';
import Dropzone from 'react-dropzone';

const FILE_FIELD_NAME = 'uploaded_files';

const DropzoneFileInput = ({name, onChangeHandler}) => {
  return (
    <Dropzone
      name={name}
      onDrop={(filesToUpload, e) => onChangeHandler(filesToUpload, e)}
    >
      <div>Try dropping some files here, or click to select files to upload.</div>
    </Dropzone>
  );
}

/**
 * This will the component of redux-form Field
 * The value MUST be initialized as empty array.
 * @param {*} input 
 * @param {*} props 
 */
const multiFilesInput = ({input, meta, ...props}) => { 
  const allFiles = input.value || [];

  const onChangeHandler = (newSelectedFiles, e) => {
    // let files = input.value;
    console.log("in multiFilesInput onChangeHandler: ");
    console.log(newSelectedFiles, e);
    console.log("----------------------------------");

    /**
     * lastModified:1497889130402
     * lastModifiedDate:Mon Jun 19 2017 22:18:50 GMT+0600 (Bangladesh Standard Time) {}
     *name
:
"spaul_cropped_right_edited.jpg"
preview
:
"blob:http://localhost:3000/31119cb8-dd85-49f0-8492-d793df5e0ee3"
size
:
178508
type
:
"image/jpeg"
webkitRelativePath
:
""
     */
    const filesAsObject = newSelectedFiles.map((file, index) => {
      return {
        name: file.name + "some random text",
        status: "not_uploaded"
      };
    });
    input.onChange(allFiles.concat(filesAsObject));
  }

  return (
    <div>
      <DropzoneFileInput
        name={input.name}
        onChangeHandler={onChangeHandler}
      />
      {meta.touched && meta.error && <span className="error">{meta.error}</span>}
      {allFiles && Array.isArray(allFiles) && (
        <ul>
          {allFiles.map((file, i) => <li key={i}>{file.name}</li>)}
        </ul>
      )}
    </div>
  )
}

class FileUploader extends Component {

  onSubmit(data) {
    var body = new FormData();
    Object.keys(data).forEach((key) => {
      body.append(key, data[key]);
    });

    console.info('POST', body, data);
    console.info('This is expected to fail:');
    fetch(`http://example.com/send/`, {
      method: 'POST',
      body: body,
    })
      .then(res => res.json())
      .then(res => console.log(res))
      .catch(err => console.error(err));
  }

  render() {
    const {
      handleSubmit,
      reset,
    } = this.props;
    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <div>
          <label htmlFor={FILE_FIELD_NAME}>Files</label>
          <Field
            name={FILE_FIELD_NAME}
            component={multiFilesInput}
          />
        </div>
        <div>
          <button type="submit">
            Submit
          </button>
          <button onClick={reset}>
            Clear Values
          </button>
        </div>
      </form>
    );
  }

  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired,
  };

}

export default reduxForm({
  form: 'simple',
})(FileUploader);
