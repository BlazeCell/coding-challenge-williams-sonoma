import ViewBase from './view-base.js';

export default class Card extends ViewBase
{
	constructor(group, container = null)
	{
		super(container);

		this.elem = document.createElement('card');

		this.container.appendChild(this.elem);
	}

	// Destroys the card
	destroy()
	{
		this.container.removeChild(this.elem);
	}
}