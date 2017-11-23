import { takeLatest, takeEvery } from 'redux-saga';
import { put } from 'redux-saga/effects';
import { arrayRemove, change } from 'redux-form';


const FINISHED_UPLOADING = "FINISHED_UPLOADING";
const FAILED_UPLOADING   = "FAILED_UPLOADING";

const randomPass = () => ((Math.floor(Math.random() * 3) + 1) > 2) ? true : false;

export function* uploadSelectedFile(action) {
    if (action.payload.status === "not_uploaded") {
        console.log("In uploadSelectedFile saga");
        console.log(action);
        console.log("------------------------");
        /* API operations */
        const payload = Object.assign({}, action.payload, { status: "uploaded", selected: true, fileUrl:"/file/LKAJLKJLKJLJ/"+action.payload.name });

        yield put({
            type: (randomPass() ? FINISHED_UPLOADING : FAILED_UPLOADING),
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

export function* fileUploadFailed(action){
    console.log("saga: FAILED FILE UPLOAD");
    const formName = action.meta.form;
    const found = /(.*)\[(\d+)\]/.exec(action.meta.field);
    console.log("Found: ", found);
    const fieldName = found[1];
    const index = found[2];
    yield put(arrayRemove(action.meta.form, fieldName, index));
}

export default function* watcher() {
    yield [
        takeLatest('@@redux-form/CHANGE', uploadSelectedFile),
        takeLatest(FINISHED_UPLOADING, fileUploadFinished),
        takeLatest(FAILED_UPLOADING, fileUploadFailed),
    ]
};
