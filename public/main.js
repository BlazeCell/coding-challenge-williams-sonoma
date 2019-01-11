
window.data =
{
	products: {},
	groups: {}
};

async function start()
{
	const view_product_list = await import('./view-product-list.js');
	const view_product_details = await import('./view-product-details.js');
	const view_image_carousel = await import('./view-image-carousel.js');

	// Load JSON and setup views.
	{
		let elem_grid_products = document.getElementById('grid_products');
		view_product_list.setup(elem_grid_products);

		view_product_details.setup();
		view_image_carousel.setup();

		// NOTE: CORS is blocking loading the products JSON via code, so I'm using a JSON file instead.
		// let url = 'https://www.westelm.com/services/catalog/v4/category/shop/new/all-new/index.json';
		let url = 'products.json';
		fetch(url)
			.then(result => result.json() )
			.then((result) => 
			{
				data.products = result;

				// console.log('JSON:\n', JSON.stringify(data.products, null, 4));

				for (let index_group = 0; index_group < data.products.groups.length; ++index_group)
				{
					// Store the group for lookup later.
					let group = data.products.groups[index_group];
					data.groups[group.id] = group;
				}

				// Populate the product list now that we have data to work with.
				view_product_list.fill();
			})
			.catch(err => { throw err; });
	}
}

start();
