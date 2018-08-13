const client = io()
window.slider = slider

slider.maxSlide = window.maxSlide
slider.currentIndex = 0
slider.slideDOMs = document.querySelectorAll('.slide__item')

slider.select = index => {
	for (let i = 0, l = slider.slideDOMs.length; i < l; i++) {
		slider.slideDOMs[i].className = slider.slideDOMs[i].className.replace(' slide__item--show', '')
	}
	slider.slideDOMs[index].className += ' slide__item--show'
}

client.on('select slide', index => {
	slider.select(+index)
})

client.on('next slide', () => {
	if (slider.currentIndex > slider.maxSlide - 2) {
		return console.log('out of slides')
	}
	slider.select(++slider.currentIndex)
})

client.on('prev slide', () => {
	if (slider.currentIndex > slider.maxSlide - 2) {
		return console.log('out of slides')
	}
	slider.select(--slider.currentIndex)
})

slider.select(0)