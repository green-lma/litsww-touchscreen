import PocketBase from 'pocketbase';
const pb = new PocketBase('http://127.0.0.1:8090');

export async function load({ params }) {
	// const records = await pb.collection('items').getFullList({
	// 	sort: 'sequence',
	// 	expand:
	// 		'media, metadata_caption_cues, metadata_image_cues, metadata_image_cues.image_reference, metadata_caption_cues.items_via_metadata_caption_cues'
	// });

	const records = await pb.collection('items').getFullList({
		sort: 'sequence',
		expand:
			'media, metadata_caption_cue_via_parent, metadata_image_cues, metadata_image_cues.image_reference'
	});

	// const test = await pb.collection('items').getFullList({
	// 	sort: 'sequence',
	// 	expand:
	// 		'media, metadata_caption_cue(parent), metadata_image_cues, metadata_image_cues.image_reference'
	// });

	// const test = await pb.collection('items').getFullList({
	// 	// sort: 'sequence',
	// 	// expand: 'metadata_caption_cues.items_via_metadata_caption_cues'
	// 	expand: 'media, metadata_caption_cues.items_via_metadata_caption_cues'
	// });

	// console.log('Back Relation', test[2].expand);
	//metadata_caption_cue_via_parent
	return {
		records
	};
}
