UserInterface.model({
	name: "menu_link",
	method: UserInterface.appendChild,
	callback: link => ({
		tagName: "div",
		className: "padding grid-gap hover-background-color-selago border-width-1 border-color-transparent hover-border-color-anakiwa",
		style: "display: grid; grid-auto-flow: column; grid-auto-columns: max-content; border-style: solid; place-items: center",
		children: [
			{
				tagName: "img",
				src: link.icon
			},
			{
				tagName: "div",
				textContent: link.textContent
			}
		]
	})
})

UserInterface.bind("menu_link", async function(element, paint, link) {

	element.addEventListener("click", function() {
		UserInterface.announce(paint, link.action)
	})

})
