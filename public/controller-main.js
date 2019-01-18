import ListCards from './views/list-cards.js';
import CardProduct from './views/card-product.js';

async function start()
{
	const model = await import('./model-main.js');

	// Have the model request and process the data for us
	let data = await model.getData();

	let groups = data.products.groups;

	// Setup the product list in the main element
	let main = document.getElementById('main');
	new ListCards(groups, CardProduct, main);
}

start();