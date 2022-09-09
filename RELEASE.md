# Release

## Prerequisites
0. install npm, twine, build
1. login to npm: `npm login`
2. bump versions in [`./package.json`](./package.json), [`./ipylabel/_version.py`](./ipylabel/_version.py) and [`./ipylabel/_frontend.py`](./ipylabel/_frontend.py)
3. commit changes (`f"chore: bump versions to {current_version}"`) with tag equal to current version (`f"v{current_version}"`)
4. release to npm
  ```sh
    npm install
    npm publish
  ```
5. release to Pypi
  ```sh
    python -m build
    twine check dist/ipylabel*
    twine upload dist/ipylabel*
  ```
