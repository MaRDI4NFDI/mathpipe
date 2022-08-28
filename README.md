# mathpipe
[![Build Status](https://travis-ci.org/physikerwelt/mathpipe.svg?branch=master)](https://travis-ci.org/physikerwelt/mathpipe)
[![Coverage Status](https://coveralls.io/repos/github/MaRDI4NFDI/mathpipe/badge.svg?branch=master)](https://coveralls.io/github/MaRDI4NFDI/mathpipe?branch=master)
[![Code Climate](https://codeclimate.com/github/physikerwelt/mathpipe/badges/gpa.svg)](https://codeclimate.com/github/physikerwelt/mathpipe)

Processes tex to png images using different routes

[![overview](doc/mathpipe.png)](http://physikerwelt.github.io/mathpipe/mathpipe.html)
## Prerequisites
To run mathpipe you need to have npm and [nodejs](https://nodejs.org) installed. The version shipped together with ubuntu 16, was tested and worked well with mathpipe. You can install the required packages on ubutu 16 via
```bash
sudo apt-get install npm nodejs-legacy
```

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

Note that for ubuntu 16 some packages are no longer required
```
sudo apt-get install build-essential dvipng ocaml \
  ocaml-native-compilers texlive texlive-bibtex-extra \
  texlive-font-utils texlive-fonts-extra \
  texlive-lang-cyrillic texlive-lang-czechslovak \
  texlive-lang-french \
  texlive-lang-german texlive-lang-greek \
  texlive-lang-italian \
  texlive-lang-other texlive-lang-polish \
  texlive-lang-portuguese texlive-lang-spanish \
  texlive-latex-extra texlive-math-extra \
  texlive-pictures texlive-pstricks texlive-publishers texlive-generic-extra
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

Template for creating MediaWiki Services in Node.js

### Running the examples

The template is a fully-working example, so you may try it right away. To
start the server hosting the REST API, simply run (inside the repo's directory)

```
npm start
```

This starts an HTTP server listening on `localhost:6927`. There are several
routes you may query (with a browser, or `curl` and friends):

* `http://localhost:6927/_info/`
* `http://localhost:6927/_info/name`
* `http://localhost:6927/_info/version`
* `http://localhost:6927/_info/home`
* `http://localhost:6927/{domain}/v1/siteinfo{/prop}`
* `http://localhost:6927/{domain}/v1/page/{title}`
* `http://localhost:6927/{domain}/v1/page/{title}/lead`
* `http://localhost:6927/ex/err/array`
* `http://localhost:6927/ex/err/file`
* `http://localhost:6927/ex/err/manual/error`
* `http://localhost:6927/ex/err/manual/deny`
* `http://localhost:6927/ex/err/auth`

### Troubleshooting

In a lot of cases when there is an issue with node it helps to recreate the
`node_modules` directory:

```
rm -r node_modules
npm install
```

Enjoy!

