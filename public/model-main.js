
export async function getData()
{
	let promise = new Promise(async (resolve) =>
	{
		let data =
		{
			products: {},
			groups_by_id: {}
		};

		// NOTE: CORS is blocking loading the live products JSON, so I'm using a local JSON file instead.
		// let url = 'https://www.westelm.com/services/catalog/v4/category/shop/new/all-new/index.json';
		let url = 'products.json';
		let response = await fetch(url);
		let result = await response.json();

		data.products = result;

		for (let index_group = 0; index_group < data.products.groups.length; ++index_group)
		{
			// Store the group for lookup later.
			let group = data.products.groups[index_group];
			data.groups_by_id[group.id] = group;
		}

		resolve(data);
	});

	return promise;
}