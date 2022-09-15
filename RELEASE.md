# Release

## Prerequisites

0. install npm, twine, build
1. login to npm: `npm login`
1. setup `~/.pypirc` to login to pypi reposotory

1. bump versions in [`./package.json`](./package.json), [`./ipylabel/_version.py`](./ipylabel/_version.py) and [`./ipylabel/_frontend.py`](./ipylabel/_frontend.py)
1. commit changes (`f"chore: bump versions to {current_version}"`) with tag equal to current version (`f"v{current_version}"`)
1. create tag `git tag -s -a v{current_version} -m "chore: bump versions to {current_version}"`

1. remove all untracked files: `git clean -fdx`
1. build widget: `pip install -e ".[test, examples]"` and `npm run build`

1. push everything `git push origin --follow-tags`
1. release to npm
1. release to pypi

```sh
  npm ci
  npm publish
```

5. release to Pypi

```sh
  python -m build
  twine check dist/ipylabel*
  twine upload dist/ipylabel*
```
