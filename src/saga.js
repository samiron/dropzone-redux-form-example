import { /*takeLatest,*/ takeEvery } from 'redux-saga';

export function* uploadSelectedFile(action) {
    console.log("In uploadSelectedFile saga");
    console.log(action);
    console.log("------------------------");
}

export default function* watcher() {
    yield [
        takeEvery('@@redux-form/CHANGE', uploadSelectedFile),
    ]
};
