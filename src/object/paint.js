ms_paint.Paint = function() {
	this.attributes = []
	this.color = null
	this.filled = null
	this.filename = null
}

ms_paint.Paint.prototype.DEFAULT_TOOL = "pencil"
ms_paint.Paint.prototype.DEFAULT_SIZE = "small"
ms_paint.Paint.prototype.DEFAULT_FILLED = "no"
ms_paint.Paint.prototype.DEFAULT_COLOR = "#000000"
ms_paint.Paint.prototype.MULTIPLIER_ERASER_LINE_WIDTH = 10
ms_paint.Paint.prototype.NAME_IMAGE = "ms_paint.png"

ms_paint.Paint.prototype.setTool = function(tool) {
	this.tool = tool
}

ms_paint.Paint.prototype.getFilename = function() {
	return this.filename
}

ms_paint.Paint.prototype.setFilename = function(filename) {
	this.filename = filename
}

ms_paint.Paint.prototype.setFilled = function(filled) {
	this.filled = filled
}

ms_paint.Paint.prototype.getFilled = function() {
	return this.filled
}

ms_paint.Paint.prototype.getSize = function() {
	return this.size
}

ms_paint.Paint.prototype.setSize = function(size) {
	this.size = size
}

ms_paint.Paint.prototype.getColor = function() {
	return this.color
}

ms_paint.Paint.prototype.setColor = function(color) {
	this.color = color
}

ms_paint.Paint.prototype.getTool = function() {
	return this.tool
}

ms_paint.Paint.prototype.getToolAction = function() {
	return this.tool.getAction()
}

ms_paint.Paint.prototype.setAttribute = function(key, value) {
	this.attributes[key] = value
}

ms_paint.Paint.prototype.getAttribute = function(key) {
	if(key in this.attributes) {
		return this.attributes[key]
	}
	return null
}