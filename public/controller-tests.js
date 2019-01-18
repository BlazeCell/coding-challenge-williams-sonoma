import ListCards from './views/list-cards.js';
import Card from './views/card.js';
import CardProduct from './views/card-product.js';
import Modal from './views/modal.js';
import ModalProductDetails from './views/modal-product-details.js';
import ModalImageCarousel from './views/modal-image-carousel.js';

/* eslint-disable */

let passed = 0;
let failed = 0;

let view = null;

function Fail(desc)
{
	throw new Error(desc);
}

function Affirm(desc, func)
{
	try 
	{
		console.log(`%cAFFIRM - ${desc}:`, 'color: #0000af; font-style: italic;');
		func();
		console.log('%cPASSED', 'color: #00af00; font-weight: bold; font-size: 1.2em;');
		++passed;
	}
	catch (error)
	{
		++failed;
		console.log('%cFAILED', 'color: #ff0000; font-weight: bold; font-size: 1.2em;');
		console.error(`%c${error}`, 'color: #ff0000; font-style: italic;');
	}
}

function Deny(desc, func)
{
	try 
	{
		console.log(`%cDENY - ${desc}:`, 'color: #0000af; font-style: italic;');
		func();
		console.log('%cFAILED', 'color: #ff0000; font-weight: bold; font-size: 1.2em;');
		++failed;
	}
	catch (error)
	{
		console.log('%cPASSED', 'color: #00af00; font-weight: bold; font-size: 1.2em;');
		console.error(`%c${error}`, 'background: white; color: #00af00; font-style: italic;');
		++passed;
	}
}

async function start()
{
	const model = await import('./model-main.js');

	// Have the model request and process the data for us
	let data = await model.getData();

	let groups = data.products.groups;
	let group = data.products.groups[0];


	// LIST CARDS


	Affirm(`ListCards without args initializes without issue`, () =>
	{
		view = new ListCards();
	});
	Affirm(`ListCards without args is present in body tag after initialization`, () =>
	{
		if (document.body.getElementsByTagName('grid').length < 1)
			Fail(`No 'grid' element found.`);
	});
	Affirm(`ListCards without args destroys itself without issue`, () =>
	{
		view.destroy();
	});
	Affirm(`ListCards without args is not present in body tag after destruction`, () =>
	{
		if (document.body.getElementsByTagName('grid').length > 0)
			Fail(`At least one 'grid' element found.`);
	});


	view = null;


	Affirm(`ListCards with 'groups' arg only initializes without issue`, () =>
	{
		view = new ListCards(groups);
	});
	Affirm(`ListCards with 'groups' arg only is present in body tag after initialization`, () =>
	{
		if (document.body.getElementsByTagName('grid').length < 1)
			Fail(`No 'grid' element found.`);
	});
	Affirm(`ListCards with 'groups' arg only has a card count to match the group count`, () =>
	{
		let count_cards = view.elem.getElementsByTagName('card').length;
		let count_groups = groups.length;
		if (count_cards != count_groups)
			Fail(`No card count of ${count_cards} does not match group count of ${count_groups}.`);
	});
	Affirm(`ListCards with 'groups' arg only does not have clickable cards`, () =>
	{
		let html_old = document.body.innerHTML;

		let cards = view.elem.getElementsByTagName('card');
		for (let index_card = 0; index_card < cards.length; ++index_card)
		{
			let card = cards[index_card];
			card.click();

			let html_new = document.body.innerHTML;

			if (html_new !== html_old)
				Fail(`The body's HTML changed between clicks.`);
		}
	});
	Affirm(`ListCards with 'groups' arg only destroys itself without issue`, () =>
	{
		view.destroy();
	});
	Affirm(`ListCards with 'groups' arg only is not present in body tag after destruction`, () =>
	{
		if (document.body.getElementsByTagName('grid').length > 0)
			Fail(`At least one 'grid' element found.`);
	});


	view = null;


	// CARD


	Affirm(`Card without args initializes without issue`, () =>
	{
		view = new Card();
	});
	Affirm(`Card without args is present in body tag after initialization`, () =>
	{
		if (document.body.getElementsByTagName('card').length < 1)
			Fail(`No 'card' element found.`);
	});
	Affirm(`Card without args contains no content`, () =>
	{
		if (view.elem.innerHTML !== '')
			Fail(`'card' element has content.`);
	});
	Affirm(`Card without args destroys itself without issue`, () =>
	{
		view.destroy();
	});
	Affirm(`Card without args is not present in body tag after destruction`, () =>
	{
		if (document.body.getElementsByTagName('card').length > 0)
			Fail(`At least one 'card' element found.`);
	});


	view = null;


	Affirm(`Card with 'group' arg only initializes without issue`, () =>
	{
		view = new Card(group);
	});
	Affirm(`Card with 'group' arg only is present in body tag after initialization`, () =>
	{
		if (document.body.getElementsByTagName('card').length < 1)
			Fail(`No 'card' element found.`);
	});
	Affirm(`Card with 'group' arg only contains no content`, () =>
	{
		if (view.elem.innerHTML !== '')
			Fail(`'card' element has content.`);
	});
	Affirm(`Card with 'group' arg only destroys itself without issue`, () =>
	{
		view.destroy();
	});
	Affirm(`Card with 'group' arg only is not present in body tag after destruction`, () =>
	{
		if (document.body.getElementsByTagName('card').length > 0)
			Fail(`At least one 'card' element found.`);
	});


	view = null;


	// CARD PRODUCT


	Deny(`CardProduct without args initializes chokes`, () =>
	{
		view = new CardProduct();
	});
	Affirm(`CardProduct without args is present in body tag after initialization`, () =>
	{
		if (document.body.getElementsByTagName('card').length < 1)
			Fail(`No 'card' element found.`);
	});
	Deny(`CardProduct without args cannot be destroyed as it's initialization failed to exit cleanly`, () =>
	{
		view.destroy();
	});
	Affirm(`CardProduct without args leaves behind a card element we can't easily destroy`, () =>
	{
		if (document.body.getElementsByTagName('card').length < 1)
			Fail(`No 'card' element found.`);

		document.body.innerHTML = '';
	});


	view = null;


	Affirm(`CardProduct with 'group' arg only initializes without issue`, () =>
	{
		view = new CardProduct(group);
	});
	Affirm(`CardProduct with 'group' arg only is present in body tag after initialization`, () =>
	{
		if (document.body.getElementsByTagName('card').length < 1)
			Fail(`No 'card' element found.`);
	});
	Affirm(`CardProduct with 'group' arg only does contain content`, () =>
	{
		if (view.elem.innerHTML === '')
			Fail(`'card' element doesn't have content.`);
	});
	Affirm(`CardProduct with 'group' arg is clickable`, () =>
	{
		let html_old = document.body.innerHTML;
		view.elem.click();
		let html_new = document.body.innerHTML;
		if (html_new === html_old)
			Fail(`Body HTML remained the same after clicking 'card'.`);
	});
	Affirm(`CardProduct with 'group' arg only destroys itself without issue`, () =>
	{
		view.destroy();
	});
	Affirm(`CardProduct with 'group' arg only is not present in body tag after destruction`, () =>
	{
		if (document.body.getElementsByTagName('card').length > 0)
			Fail(`At least one 'card' element found.`);
	});


	view = null;
	document.body.innerHTML = '';


	// MODAL


	Affirm(`Modal without args initializes without issue`, () =>
	{
		view = new Modal();
	});
	Affirm(`Modal without args is present in body tag after initialization`, () =>
	{
		if (document.body.getElementsByTagName('modal').length < 1)
			Fail(`No 'modal' element found.`);
	});
	Affirm(`Modal without args destroys itself without issue`, () =>
	{
		view.destroy();
	});
	Affirm(`Modal without args is not present in body tag after destruction`, () =>
	{
		if (document.body.getElementsByTagName('modal').length > 0)
			Fail(`At least one 'modal' element found.`);
	});


	view = null;


	Affirm(`Modal with 'group' arg only initializes without issue`, () =>
	{
		view = new Modal(group);
	});
	Affirm(`Modal with 'group' arg only is present in body tag after initialization`, () =>
	{
		if (document.body.getElementsByTagName('modal').length < 1)
			Fail(`No 'modal' element found.`);
	});
	Affirm(`Modal with 'group' arg only has no content`, () =>
	{
		if (view.content.innerHTML !== '')
			Fail(`'modal' has content.`);
	});
	Affirm(`Modal with 'group' arg only destroys itself without issue`, () =>
	{
		view.destroy();
	});
	Affirm(`Modal with 'group' arg only is not present in body tag after destruction`, () =>
	{
		if (document.body.getElementsByTagName('modal').length > 0)
			Fail(`At least one 'modal' element found.`);
	});


	view = null;


	// MODAL PRODUCT DETAILS


	Deny(`ModalProductDetails without args initializes chokes`, () =>
	{
		view = new ModalProductDetails();
	});
	Affirm(`ModalProductDetails without args is present in body tag after initialization`, () =>
	{
		if (document.body.getElementsByTagName('modal').length < 1)
			Fail(`No 'modal' element found.`);
	});
	Deny(`ModalProductDetails without args cannot be destroyed as it's initialization failed to exit cleanly`, () =>
	{
		view.destroy();
	});
	Affirm(`ModalProductDetails without args leaves behind a modal element we can't easily destroy`, () =>
	{
		if (document.body.getElementsByTagName('modal').length < 1)
			Fail(`No 'modal' element found.`);

		document.body.innerHTML = '';
	});


	view = null;


	Affirm(`ModalProductDetails with 'group' arg only initializes without issue`, () =>
	{
		view = new ModalProductDetails(group);
	});
	Affirm(`ModalProductDetails with 'group' arg only is present in body tag after initialization`, () =>
	{
		if (document.body.getElementsByTagName('modal').length < 1)
			Fail(`No 'modal' element found.`);
	});
	Affirm(`ModalProductDetails with 'group' arg only does have content`, () =>
	{
		if (view.content.innerHTML === '')
			Fail(`'modal' doesn't have content.`);
	});
	Affirm(`ModalProductDetails with 'group' arg only has a clickable hero image`, () =>
	{
		let html_old = document.body.innerHTML;
		view.image_hero.click();
		let html_new = document.body.innerHTML;
		if (html_new === html_old)
			Fail(`Body HTML remained the same after clicking 'image'.`);
	});
	Affirm(`ModalProductDetails with 'group' arg only destroys itself without issue`, () =>
	{
		view.destroy();
	});
	Affirm(`ModalProductDetails with 'group' arg only is not present in body tag after destruction`, () =>
	{
		// NOTE: There should be one modal because the hero image was clicked.
		if (document.body.getElementsByTagName('modal').length > 1)
			Fail(`At least one 'modal' element found.`);
	});


	view = null;
	document.body.innerHTML = '';


	// MODAL IMAGE CAROUSEL


	Deny(`ModalImageCarousel without args initializes chokes`, () =>
	{
		view = new ModalImageCarousel();
	});
	Affirm(`ModalImageCarousel without args is present in body tag after initialization`, () =>
	{
		if (document.body.getElementsByTagName('modal').length < 1)
			Fail(`No 'modal' element found.`);
	});
	Deny(`ModalImageCarousel without args cannot be destroyed as it's initialization failed to exit cleanly`, () =>
	{
		view.destroy();
	});
	Affirm(`ModalImageCarousel without args leaves behind a modal element we can't easily destroy`, () =>
	{
		if (document.body.getElementsByTagName('modal').length < 1)
			Fail(`No 'modal' element found.`);

		document.body.innerHTML = '';
	});


	view = null;


	Affirm(`ModalImageCarousel with 'group' arg only initializes without issue`, () =>
	{
		view = new ModalImageCarousel(group);
	});
	Affirm(`ModalImageCarousel with 'group' arg only is present in body tag after initialization`, () =>
	{
		if (document.body.getElementsByTagName('modal').length < 1)
			Fail(`No 'modal' element found.`);
	});
	Affirm(`ModalImageCarousel with 'group' arg only does have content`, () =>
	{
		if (view.content.innerHTML === '')
			Fail(`'modal' doesn't have content.`);
	});
	Affirm(`ModalImageCarousel with 'group' arg only destroys itself without issue`, () =>
	{
		view.destroy();
	});
	Affirm(`ModalImageCarousel with 'group' arg only is not present in body tag after destruction`, () =>
	{
		if (document.body.getElementsByTagName('modal').length > 0)
			Fail(`At least one 'modal' element found.`);
	});


	view = null;
	document.body.innerHTML = '';







	console.log(`%c------------------`, 'color: #111; font-weight: bold;');
	console.log(`%cTest Total: ${passed+failed}`, 'color: #0000af; font-weight: bold; font-size: 1.5em;');
	console.log(`%cTests Passed: ${passed}`, 'color: #00af00; font-weight: bold; font-size: 1.5em;');
	console.log(`%cTests Failed: ${failed}`, 'color: #ff0000; font-weight: bold; font-size: 1.5em;');
}

start();

/* eslint-enable */