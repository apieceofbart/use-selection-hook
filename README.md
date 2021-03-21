# useSelection hook

React hook for keeping track of selected list of elements written in Typescript.

## Instalation and usage

### Install:

```
npm install use-selection-hook
```

### Import:

```
import { useSelection } from 'use-selection-hook'
```

or as default import

```
import useSelection from 'use-selection-hook'
```

or as commonjs

```
const useSelection = require('use-selection-hook')
```

### Usage/API:

```
Hooks has two parameters:
1. data - an array of items, each has to have `id` property that is a string. It is required.
2. defaultSelection - an array of `ids` (strings) - items that should be preselected.

Hook returns a bunch of properties and methods:

const {
  /* array of ids of current selected items /*
  selection: string[];
  /* returns true if element with given `id` is selected */
  isSelected: (id: string) => boolean;
  /* toggles selection of element with give `id` */
  toggleSelection: (id: string) => void;
  /* toggles selection of all items */
  toggleSelectionAll: () => void;
  /* return true if all elements are selected */
  isAllSelected: boolean;
  /* clears selection */
  clearSelection: () => void;
  /* return array of all selected items */
  selectedItems: T[];
  /* return number of selected items */
  totalSelected: number;
  /* method for setting a selection manually
  * it has a similar interface to setState from useState hook
  * it either accepts new selection (array of strings) to set
  * or a callback that has to return a new selection that has a single parameter - current selection
  * the second form is helpful if you need memoization
  */
  setSelected: (selectionOrCallback: string[] | ((selection: string[]) => string[])) => void;
  /* the original data that was passed to hook */
  data: T[];
} = useSelection(data: T[], defaultSelection?: string[])

Please note that if you change the data passed to hook it will compare the current selection with the new data.
This is helpful if you work on immutable structures and you for example remove item and pass a completely new array withouth that item removed.
This also means that you have to memoize the data passed to hook otherwise you'll get infinite loops.

```

### Example

Please check this codesandbox for a an example (React + Typescript):
https://codesandbox.io/s/useselection-hook-10gn3?file=/src/App.tsx

## Testing

```
TODO
```

## Issues & Contributions

If you found a bug or would like to propose a feature please create an issue. If you'd like to contribute please create a PR with an explanation - make sure to add a test case.
