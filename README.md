# ipylabel

[![Build Status](https://github.com/unrndm/ipylabel/actions/workflows/main.yml/badge.svg)](https://github.com/unrndm/ipylabel/actions)
[![Documentation Status](https://readthedocs.org/projects/ipylabel/badge/?version=latest)](https://ipylabel.readthedocs.io/en/latest/?badge=latest)

<!-- [![codecov](https://codecov.io/gh/unrndm/ipylabel/branch/master/graph/badge.svg)](https://codecov.io/gh/unrndm/ipylabel) -->

[![Binder](https://mybinder.org/badge_logo.svg)](https://mybinder.org/v2/gh/unrndm/ipylabel/HEAD?labpath=examples%2Fintroduction.ipynb)
[![Open In Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/unrndm/ipylabel/blob/dev/examples/introduction.ipynb)

[![NPM](https://img.shields.io/badge/NPM-%23000000.svg?style=for-the-badge&logo=npm&logoColor=white)](https://www.npmjs.com/package/ipylabel)
[![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)](https://pypi.org/project/ipylabel/)

A Jupyter Widget Library for labeling text.

## Installation

You can install using `pip`:

```bash
pip install ipylabel
```

If you are using Jupyter Notebook 5.2 or earlier, you may also need to enable
the nbextension:

```bash
jupyter nbextension enable --py [--sys-prefix|--user|--system] ipylabel
```

## Development Installation

Create a dev environment:

```bash
conda create -n ipylabel -c conda-forge nodejs yarn python jupyterlab jupyter-packaging
conda activate ipylabel
```

Install the python. This will also build the TS package.

```bash
pip install -e ".[test, examples]"
```

When developing your extensions, you need to manually enable your extensions with the
notebook / lab frontend. For lab, this is done by the command:

```
jupyter labextension develop --overwrite .
npm run build
```

For classic notebook, you need to run:

```
jupyter nbextension install --sys-prefix --symlink --overwrite --py ipylabel
jupyter nbextension enable --sys-prefix --py ipylabel
```

Note that the `--symlink` flag doesn't work on Windows, so you will here have to run
the `install` command every time that you rebuild your extension. For certain installations
you might also need another flag instead of `--sys-prefix`, but we won't cover the meaning
of those flags here.

### How to see your changes

#### Typescript:

If you use JupyterLab to develop then you can watch the source directory and run JupyterLab at the same time in different
terminals to watch for changes in the extension's source and automatically rebuild the widget.

```bash
# Watch the source directory in one terminal, automatically rebuilding when needed
npm run watch
# Run JupyterLab in another terminal
jupyter lab
```

After a change wait for the build to finish and then refresh your browser and the changes should take effect.

#### Python:

If you make a change to the python code then you will need to restart the notebook kernel to have it take effect.

## TODO:

- [x] add packages to regestries (pypi and npm)
- [x] ensure google colab compatability
- [x] jupyter binder support!
- [ ] add black
  - add vscode task
  - possible extension
  - add config
  - add badge
- [ ] add isort
  - add vscode task
  - add vscode extension
  - add config with support for black
  - add badge
- [ ] add prettier
  - add badge
- [ ] add stylelint
  - add badge
- [ ] add linting task to vscode
- [ ] add code coverage with budge
- [ ] [prebuild images for binder](https://github.com/jupyterhub/repo2docker-action#use-github-actions-to-cache-the-build-for-binderhub)
- [ ] [auto badges on pull request?](https://mybinder.readthedocs.io/en/latest/howto/gh-actions-badges.html)
