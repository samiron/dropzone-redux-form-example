import { takeLatest, takeEvery } from 'redux-saga';
import { put } from 'redux-saga/effects';


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
    yield put({
        type: '@@redux-form/CHANGE',
        meta:action.meta,
        payload:payload
    });
}

export function* fileUploadFailed(action){
    console.log("saga: FAILED FILE UPLOAD");

}

export default function* watcher() {
    yield [
        takeLatest('@@redux-form/CHANGE', uploadSelectedFile),
        takeLatest(FINISHED_UPLOADING, fileUploadFinished),
        takeLatest(FAILED_UPLOADING, fileUploadFailed),
    ]
};
