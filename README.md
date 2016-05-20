# mathpipe
[![Build Status](https://travis-ci.org/physikerwelt/mathpipe.svg?branch=master)](https://travis-ci.org/physikerwelt/mathpipe)
[![Coverage Status](https://coveralls.io/repos/github/physikerwelt/mathpipe/badge.svg?branch=master)](https://coveralls.io/github/physikerwelt/mathpipe?branch=master)
[![bitHound Overall Score](https://www.bithound.io/github/physikerwelt/mathpipe/badges/score.svg)](https://www.bithound.io/github/physikerwelt/mathpipe)
[![Code Climate](https://codeclimate.com/github/physikerwelt/mathpipe/badges/gpa.svg)](https://codeclimate.com/github/physikerwelt/mathpipe)

Processes tex to png images using different routes

[![overview](doc/mathpipe.png)](http://physikerwelt.github.io/mathpipe/mathpipe.html)

## installation

To install run
```
npm install
```

### texvc
To use texvc you need to install in addition
```
git submodule init
git submodule update
sudo apt-get install build-essential dvipng ocaml \
  ocaml-native-compilers texlive texlive-bibtex-extra \
  texlive-font-utils texlive-fonts-extra texlive-lang-croatian \
  texlive-lang-cyrillic texlive-lang-czechslovak texlive-lang-danish \
  texlive-lang-dutch texlive-lang-finnish texlive-lang-french \
  texlive-lang-german texlive-lang-greek texlive-lang-hungarian \
  texlive-lang-italian texlive-lang-latin texlive-lang-mongolian \
  texlive-lang-norwegian texlive-lang-other texlive-lang-polish \
  texlive-lang-portuguese texlive-lang-spanish texlive-lang-swedish \
  texlive-lang-vietnamese texlive-latex-extra texlive-math-extra \
  texlive-pictures texlive-pstricks texlive-publishers texlive-generic-extra
cd tools/texvc
make
```

### LaTeXML
To use LaTeXML additional installation is required:
```bash
git submodule init
git submodule update
sudo apt-get install   \
  libarchive-zip-perl libfile-which-perl libimage-size-perl \
  libio-string-perl libjson-xs-perl libwww-perl libparse-recdescent-perl \
  liburi-perl libxml2 libxml-libxml-perl libxslt1.1 libxml-libxslt-perl \
  texlive imagemagick perlmagick make
cd tools/LaTeXML
perl Makefile.PL
make
make test
```
(The last command is optional)
### mathoid and restbase
```bash
git submodule init
git submodule update
sudo apt-get install librsvg2-dev
cd tools/mathoid
npm install
npm test
node server.js -c ../mathoid.yaml
```
```bash
git submodule init
git submodule update
cd tools/restbase
npm install
npm test
node server.js -c ../restbase.yaml
```

### Xvfb
If you have no real X-Server you can use xvfb
```
sudo apt-get install xvfb
export DISPLAY=:99.0
/sbin/start-stop-daemon --start --quiet --pidfile /tmp/custom_xvfb_99.pid --make-pidfile --background --exec /usr/bin/Xvfb -- :99 -ac -screen 0 1280x1024x16
```
## testing

To run the tests run
 ```
 npm test
 ```
 for coverage tests use
 ```
 npm run-script coverage
 ```

## running

To run the program run
```
bin/mathpipe --help
```

## testdata
You can get a [compact test data](http://en.formulasearchengine.com/w/images/math-formula-testcases.json)
or the full english [wikipedia dataset](https://github.com/wikimedia/texvcjs/blob/master/test/en-wiki-formulae.json?raw=true). 

Thereafter run
```
mathpipe convert <path relative to the mathpipe executable> [output directory]
```
For larger dataset it's recommended to adjust the [config](config.yaml).
