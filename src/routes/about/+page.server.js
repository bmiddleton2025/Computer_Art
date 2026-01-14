import fs from 'fs';
import path from 'path';

const directoryPath = path.join(__dirname, 'images');

export async function load() {
	try {
		console.log(directoryPath);
		let files = fs.readdirSync(directoryPath);
		console.log(files);
		return {
			images: files.map((file) => {
				return { src: `./static/images/${file}`, alt: file };
			})
		};
	} catch (err) {
		console.log(err);
	}
}
