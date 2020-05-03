ms_paint.tabs = [
	{
		name: "Home",
		toolboxes: [
			{
				name: "Clipboard",
				controls: [
					{
						model: "collection.button",
						action: "paste",
						attributes: {
							text: "Paste"
						}
					},
					{
						model: "collection.button",
						action: "cut",
						attributes: {
							text: "Cut"
						}
					},
					{
						model: "collection.button",
						action: "copy",
						attributes: {
							text: "Copy"
						}
					},
				]
			},
			{
				name: "Image",
				controls: [
					{
						model: "collection.button",
						active: true,
						action: "tool set",
						value: "select",
						attributes: {
							text: "Select"
						}
					},
					{
						model: "collection.button",
						active: true,
						action: "tool set",
						value: "crop",
						attributes: {
							text: "Crop"
						}
					},
					{
						model: "collection.button",
						action: "resize",
						attributes: {
							text: "Resize"
						}
					},
					{
						model: "collection.button",
						action: "rotate",
						attributes: {
							text: "Rotate"
						}
					},
				]
			},
			{
					name: "Tools",
					controls: [
						{
							model: "collection.button",
							active: true,
							action: "tool set",
							value: "pencil",
							attributes: {
								text: "Pencil"
							}
						},
						{
							model: "collection.button",
							active: true,
							action: "tool set",
							value: "eraser",
							attributes: {
								text: "Eraser"
							}
						}
					]
				},
				{
					name: "Shapes",
					controls: [
						{
							model: "collection.button",
							active: true,
							action: "tool set",
							value: "line",
							attributes: {
								text: "Line"
							}
						},
						{
							model: "collection.button",
							active: true,
							action: "tool set",
							value: "rectangle",
							attributes: {
								text: "Rectangle"
							}
						},
						{
							model: "collection.button",
							active: true,
							action: "tool set",
							value: "circle",
							attributes: {
								text: "Circle"
							}
						},
						{
							model: "collection.label_radio",
							action: "filled set",
							attributes: {
								name: "filled",
								value: "no",
								text: "Empty"
							}
						},
						{
							model: "collection.label_radio",
							action: "filled set",
							attributes: {
								name: "filled",
								value: "yes",
								text: "Filled"
							}
						}
					]
				},
				{
					name: "Size",
					controls: [
						{
							model: "collection.select",
							action: "size set",
							attributes: {
								options: [
									{text: "small", value: 1},
									{text: "medium", value: 3},
									{text: "large", value: 6}
								]
							}
						}
					]
				},
				{
					name: "Colors",
					controls: [
						{
							model: "collection.input_color",
							action: "color set"
						}
					]
				}
		]
	},
	{
		name: "View",
		toolboxes: [
			{
				name: "Zoom",
				controls: [
					{
						model: "collection.button",
						action: "zoom in",
						attributes: {
							text: "Zoom in"
						}
					},
					{
						model: "collection.button",
						action: "zoom out",
						attributes: {
							text: "Zoom out"
						}
					},
					{
						model: "collection.button",
						action: "zoom reset",
						attributes: {
							text: "Reset Zoom"
						}
					}
				]
			},
			{
				name: "Show or hide",
				controls: [
					{
						model: "collection.label_checkbox",
						action: "ruler toggle",
						attributes: {
							text: "Ruler"
						}
					},
					{
						model: "collection.label_checkbox",
						action: "gridlines toggle",
						attributes: {
							text: "Gridlines"
						}
					},
					{
						model: "collection.label_checkbox",
						action: "statusbar toggle",
						attributes: {
							text: "Status bar"
						}
					},
				]
			},
			{
				name: "Display",
				controls: [
					{
						model: "collection.button",
						action: "fullscreen toggle",
						attributes: {
							text: "Full screen"
						}
					},
					{
						model: "collection.button",
						action: "thumbnail toggle",
						attributes: {
							text: "Thumbnail"
						}
					},
				]
			}
		]
	}
]