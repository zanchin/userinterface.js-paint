UserInterface.model({
	name: "toolbar",
	method: UserInterface.appendChild,
	properties: {
		tagName: "div",
		className: "toolbar",
		style: "background-color: white",
		children: [
			{
				tagName: "div",
				style: "display:grid; grid-auto-flow: column; grid-auto-columns: max-content",
				children: [
					{
						tagName: "div",
						className: "menus",
						style: "display: grid; grid-auto-flow: column; grid-auto-columns: max-content"
					},
					{
						tagName: "div",
						className: "tabs grid-gap-xxs",
						style: "display: grid; grid-auto-flow: column; grid-auto-columns: max-content"
					}
				]
			},
			{
				tagName: "div",
				className: "tab-content"
			}
		]
	}
})

UserInterface.bind("toolbar", async function(element, paint) {

	const menusNode = element.querySelector(".menus")
	const tabsNode = element.querySelector(".tabs")
	const tabContentNode = element.querySelector(".tab-content")

	const {tabs, menus} = ms_paint
	for(const menu of menus) {
		await UserInterface.runModel("menu", {parentNode: menusNode, bindingArgs: [paint, menu], data: menu})
	}
	for(const tab of tabs) {
		await UserInterface.runModel("collection.tab", {parentNode: tabsNode, bindingArgs: [paint, { action: "tab set", name: tab.name }], data: { className: "tab", text: tab.name }})
		await UserInterface.runModel("toolboxes", {parentNode: tabContentNode, bindingArgs: [paint, tab], data: tab})
	}

})