import { takeLatest, takeEvery } from 'redux-saga';
import { put } from 'redux-saga/effects';
import { arrayRemove, change } from 'redux-form';


const FINISHED_UPLOADING = "FINISHED_UPLOADING";
const FAILED_UPLOADING = "FAILED_UPLOADING";

const randomSuccess = () => ((Math.floor(Math.random() * 3) + 1) > 2) ? FINISHED_UPLOADING : FAILED_UPLOADING;
const uploadSuccessful = () => FINISHED_UPLOADING;

export function* uploadSelectedFile(action) {
    if (false && action.payload.status === "not_uploaded") {
        console.log("In uploadSelectedFile saga");
        console.log(action);
        console.log("------------------------");
        /* API operations */
        const payload = Object.assign({}, action.payload, { status: "uploaded", selected: true, fileUrl: "/file/LKAJLKJLKJLJ/" + action.payload.name });

        yield put({
            type: uploadSuccessful(),
            payload: payload,
            meta: action.meta
        });
    }
}

export function* fileUploadFinished(action) {
    console.log("fileupload finished");
    console.log(action);
    console.log("--------------------");
    const payload = Object.assign({}, action.payload, { secret: "key", selected: true });
    console.log("payload: ", payload, "meta:", action.meta);
    const changeAction = change(action.meta.form, action.meta.field, payload);
    console.log("CHANGE ACTION: ", changeAction);
    yield put(changeAction);
}

export function* fileUploadFailed(action) {
    console.log("saga: FAILED FILE UPLOAD");
    const formName = action.meta.form;
    const matches = /(.*)\[(\d+)\]/.exec(action.meta.field);
    console.log("Found: ", matches);

    if (matches) {
        // Array file field. 
        // We may want to reinitialize with empty file placeholder OR
        // change(form, action.meta.field, EMPTY_FILE)
        // Remove it.
        const fieldName = matches[1];
        const index = matches[2];
        yield put(arrayRemove(action.meta.form, fieldName, index));
    } else {
        // Single file field
        // change(form, action.meta.field, EMPTY_FILE)
    }
}

export default function* watcher() {
    yield [
        takeLatest('@@redux-form/CHANGE', uploadSelectedFile),
        takeLatest(FINISHED_UPLOADING, fileUploadFinished),
        takeLatest(FAILED_UPLOADING, fileUploadFailed),
    ]
};
