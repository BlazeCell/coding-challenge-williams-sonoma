import ViewBase from './view-base.js';

export default class Modal extends ViewBase
{
	constructor(group, container = null)
	{
		super(container);

		let overlay = document.createElement('overlay');
		let modal = document.createElement('modal');
		let content = document.createElement('content');
		modal.appendChild(content);
		let button_close = document.createElement('close');
		modal.appendChild(button_close);

		button_close.innerHTML = '&#x1F5D9;';

		// Define a click handler for the closing the modal.
		let clickClose = () =>
		{
			this.destroy();
			return false;
		};
		button_close.onclick = clickClose;
		overlay.onclick = clickClose;

		// Wire up the modal to stop event bubbling when it's clicked.
		modal.onclick = () =>
		{
			return false;
		};

		this.container.appendChild(overlay);
		this.container.appendChild(modal);

		this.elem = modal;
		this.overlay = overlay;
		this.content = content;
		this.button_close = button_close;

		window.scrollTo(0, 0);
	}

	// Destroys the modal.
	destroy()
	{
		this.container.removeChild(this.elem);
		this.container.removeChild(this.overlay);
	}
}