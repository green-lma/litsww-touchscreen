import PocketBase from 'pocketbase';
const url = 'http://127.0.0.1:8090';
const pb = new PocketBase('http://127.0.0.1:8090');

function parseImages(imageArray) {
	// console.log('THUMB', imageArray);
	let items = imageArray
		.sort((a, b) => a.sequence - b.sequence)
		.map((el, index) => {
			let padToThree =
				el.sequence >= el.sequence <= 999 ? `00${el.sequence}`.slice(-3) : el.sequence;
			return {
				id: padToThree,
				dataIndex: index,
				label: el.label,
				// image: `${url}/api/files/${el.collectionId}/${el.id}/${el.file}`,
				// thumbnail: `${url}/api/files/${el.collectionId}/${el.id}/${el.thumbnail}`
				image: `${el.collectionId}/${el.id}/${el.file}`,
				thumbnail: `${el.collectionId}/${el.id}/${el.thumbnail}`
			};
		})
		.sort((a, b) => a.id - b.id);
	return items;
}

export async function load({ params }) {
	const imageCollection = await pb.collection('image_collection').getFullList({
		filter: `id = "${params.id}"`,
		expand: 'images'
	});

	// console.log(
	// 	'LOG',
	// 	imageCollection[0].expand.images.sort((a, b) => a.sequence - b.sequence)
	// );

	// let returned = imageCollection.map((el) => {
	// 	return {
	// 		label: el.label,
	// 		description: el.description,
	// 		items: parseImages(el.expand.images)
	// 	};
	// });

	let returned = {
		label: imageCollection[0].label,
		description: imageCollection[0].description,
		items: parseImages(imageCollection[0].expand.images)
	};

	// console.log('RTN', JSON.stringify(returned, null, 4));
	return {
		id: params.id,
		returned
	};
}
