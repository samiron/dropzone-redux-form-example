import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { reduxForm, Field, FieldArray } from 'redux-form';
import Dropzone from 'react-dropzone';

const FILE_FIELD_NAME = 'uploaded_files';
const FILE_FIELD_ARRAY_NAME = 'uploaded_file_array';

/**
 * A file object returned by dropzone looks like below
 * {
 *     lastModified:1497889130402
 *     lastModifiedDate:Mon Jun 19 2017 22:18:50 GMT+0600 (Bangladesh Standard Time) {}
 *     name: "spaul_cropped_right_edited.jpg",
 *     preview: "blob:http://localhost:3000/31119cb8-dd85-49f0-8492-d793df5e0ee3"
 *     size: 178508
 *     type: "image/jpeg"
 *     webkitRelativePath:""
 * }
 * 
 * This will the component of redux-form Field
 * The value MUST be initialized as empty array.
 * Is usable with redux-form Field variable.
 * @param {*} input 
 * @param {*} props 
 */
const MultiFilesWithSingleField = ({ input, meta, ...props }) => {
  const onChangeHandler = (newSelectedFiles, e) => {
    // let files = input.value;
    console.log("in multiFilesInput onChangeHandler: ");
    console.log(newSelectedFiles, e);
    console.log("----------------------------------");

    // const filesAsObject = newSelectedFiles.map((file, index) => {
    //   return {
    //     name: file.name,
    //     status: "not_uploaded"
    //   };
    // });
    const fileObject = {
      name: newSelectedFiles[0].name,
      status: "not_uploaded",
      selected: true
    };
    input.onChange(fileObject);
    props.onSelect();
  }


  return (
    <div>
      <Dropzone
        maxSize={1048576}
        disablePreview={true}
        name={name}
        className="dropzoneclass"
        onDropAccepted={(filesToUpload, e) => onChangeHandler(filesToUpload, e)}
        onDropRejected={(rejected) => console.log("Rejected: ", rejected)}
      >
        {props.visibleElement}
      </Dropzone>
      {/* {meta.touched && meta.error && <span className="error">{meta.error}</span>}
      {/* {allFiles && Array.isArray(allFiles) && (
        <ul>
          {allFiles.map((file, i) => <li key={i}>{file.name}</li>)}
        </ul>
      )} */}
    </div>
  )
}

const renderSelectedFile = ({ field, meta, ...props }) => {
  return <li>
    {props.fileObject.name}
    <span onClick={props.onRemove}>Remove this</span>
  </li>
};


const showSelectedFiles = (field, fileObj, index, onRemove) => {
  if (fileObj.selected) {
    console.log("Rendering selected files");
    return <Field
      name={field}
      component={renderSelectedFile}
      onRemove={() => onRemove(index)}
      fileObject={fileObj}
    />;  
  }  
  return null;
}  

const showDropArea = (fieldName, fileObj, onSelect) => {
  const visibleElement = <span className="uploadtext">DROP HERE</span>;
  if (!fileObj.selected) {
    return <Field
      name={fieldName}
      component={MultiFilesWithSingleField}
      onSelect={onSelect}
      visibleElement={visibleElement} />
  }
}

const MultiFilesWithFielArray = ({ fields, meta }) => {
  const onSelect = () => {
    fields.push({ selected: false });
  }  

  const onRemove = (index) => {
    console.log("Removing index: ", index);
    fields.remove(index);
  }

  return (
    <div>
      {fields.map((field, index) => {
        const value = fields.get(index);
        return <span key={index}>
          {showDropArea(field, value, onSelect)}
          <ul>
            {showSelectedFiles(field, value, index, onRemove)}
          </ul>
        </span>
      })}
    </div>
  );
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
        {/* <div>
          <label htmlFor={FILE_FIELD_NAME}>Files</label>
          <Field
            name={FILE_FIELD_NAME}
            component={MultiFilesWithSingleField}
          />
        </div> */}

        <div>
          <label htmlFor={FILE_FIELD_ARRAY_NAME}>Files array</label>
          <FieldArray
            name={FILE_FIELD_ARRAY_NAME}
            component={MultiFilesWithFielArray}
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

}

// FileUploader.propTypes = {
//   handleSubmit: PropTypes.func.isRequired,
//   reset: PropTypes.func.isRequired,
// };

export default reduxForm({
  form: 'simple',
})(FileUploader);
