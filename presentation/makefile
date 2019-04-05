all: compile-scss generate

generate:
	pandoc -t revealjs -s -o presentation.html presentation.md  -V revealjs-url=https://revealjs.com -V css=slides.css

	# pandoc -t revealjs -s -o presentation-beige.html presentation.md  -V revealjs-url=./reveal.js -V css=slides.css -V theme=beige
	# pandoc -t revealjs -s -o presentation-black.html presentation.md  -V revealjs-url=./reveal.js -V css=slides.css -V theme=black
	# pandoc -t revealjs -s -o presentation-blood.html presentation.md  -V revealjs-url=./reveal.js -V css=slides.css -V theme=blood
	# pandoc -t revealjs -s -o presentation-league.html presentation.md  -V revealjs-url=./reveal.js -V css=slides.css -V theme=league
	# pandoc -t revealjs -s -o presentation-moon.html presentation.md  -V revealjs-url=./reveal.js -V css=slides.css -V theme=moon
	# pandoc -t revealjs -s -o presentation-night.html presentation.md  -V revealjs-url=./reveal.js -V css=slides.css -V theme=night
	# pandoc -t revealjs -s -o presentation-serif.html presentation.md  -V revealjs-url=./reveal.js -V css=slides.css -V theme=serif
	# pandoc -t revealjs -s -o presentation-simple.html presentation.md  -V revealjs-url=./reveal.js -V css=slides.css -V theme=simple
	# pandoc -t revealjs -s -o presentation-sky.html presentation.md  -V revealjs-url=./reveal.js -V css=slides.css -V theme=sky
	# pandoc -t revealjs -s -o presentation-solarized.html presentation.md  -V revealjs-url=./reveal.js -V css=slides.css -V theme=solarized
	# pandoc -t revealjs -s -o presentation-white.html presentation.md  -V revealjs-url=./reveal.js -V css=slides.css -V theme=white

compile-scss:
	sass ./sass/app.scss ./slides.css