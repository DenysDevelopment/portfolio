import {
	getStorage,
	ref,
	uploadBytesResumable,
	getDownloadURL,
} from 'firebase/storage';
import { app } from './';

const storage = getStorage(app);
const storageRef = ref(
	storage,
	`${new Date().getDate()}_${new Date().getMonth()}_${new Date().getFullYear()}_${new Date().getMilliseconds()}`,
);

export const writeFile = (file: any, setProgress: any, setUrlImg: any) => {
	const UploadTask = uploadBytesResumable(storageRef, file);

	return UploadTask.on(
		'state_changed',
		(snapshot) => {
			let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
			setProgress(progress);
		},
		() => {
			console.log('error');
		},
		async () => {
			await getDownloadURL(UploadTask.snapshot.ref).then((url) => {
				return setUrlImg(url);
			});
		},
	);
};
