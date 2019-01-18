import ViewBase from './view-base.js';
import Card from './card.js';

export default class ListCards extends ViewBase
{
	constructor(groups, card_class, container = null)
	{
		super(container);

		// Default the card class to generic cards.
		if (!card_class)
			card_class = Card;

		let grid = document.createElement('grid');

		this.cards = [];
		for (let index_group = 0; index_group < groups.length; ++index_group)
		{
			let group = groups[index_group];

			let card = new card_class(group);
			grid.appendChild(card.elem);

			this.cards.push(card);
		}

		this.container.appendChild(grid);

		this.elem = grid;
	}

	// Destroys the list
	destroy()
	{
		this.container.removeChild(this.elem);
	}
}