import { useSelection, Item } from "../src/index";
import { renderHook, act } from "@testing-library/react-hooks";
import * as chai from "chai";
import "mocha";
const { expect } = chai;

describe("useSelection", () => {
  const defaultItems = [
    {
      id: "1",
      name: "Paul",
    },
    {
      id: "2",
      name: "John",
    },
    {
      id: "3",
      name: "George",
    },
    {
      id: "4",
      name: "Ringo",
    },
  ];

  it("should check if item is selected", () => {
    const { isSelected } = renderHook(() =>
      useSelection(defaultItems, ["1"])
    ).result.current;
    expect(isSelected("1")).to.be.true;
  });

  it("should toggle selected item", () => {
    const { result } = renderHook(() => useSelection(defaultItems));

    act(() => {
      result.current.toggleSelection("1");
    });

    expect(result.current.selectedItems).to.deep.equal([defaultItems[0]]);
    expect(result.current.selection).to.deep.equal(["1"]);

    act(() => {
      result.current.toggleSelection("1");
    });

    expect(result.current.selectedItems).to.deep.equal([]);
    expect(result.current.selection).to.deep.equal([]);
  });

  it("should toggle all items", () => {
    const { result } = renderHook(() => useSelection(defaultItems));

    act(() => {
      result.current.toggleSelectionAll();
    });

    expect(result.current.selectedItems).to.deep.equal(defaultItems);
    expect(result.current.selection).to.deep.equal(["1", "2", "3", "4"]);

    act(() => {
      result.current.toggleSelectionAll();
    });

    expect(result.current.selectedItems).to.deep.equal([]);
    expect(result.current.selection).to.deep.equal([]);
  });

  it("should check if all items are selected", () => {
    const { result } = renderHook(() => useSelection(defaultItems, ["1"]));

    expect(result.current.isAllSelected).to.be.false;

    act(() => {
      result.current.toggleSelectionAll();
    });

    expect(result.current.isAllSelected).to.be.true;
  });

  it("should clear selection", () => {
    const { result } = renderHook(() => useSelection(defaultItems, ["1"]));

    act(() => {
      result.current.clearSelection();
    });

    expect(result.current.selection).to.deep.equal([]);
  });

  it("should set selection using array of new ids", () => {
    const { result } = renderHook(() => useSelection(defaultItems, ["1"]));

    act(() => {
      result.current.setSelected(["1", "2", "3"]);
    });

    expect(result.current.selection).to.deep.equal(["1", "2", "3"]);
  });

  it("should set selection using callback", () => {
    const { result } = renderHook(() => useSelection(defaultItems, ["1"]));

    act(() => {
      result.current.setSelected((selection) => selection.concat("2", "3"));
    });

    expect(result.current.selection).to.deep.equal(["1", "2", "3"]);
  });

  it("should adjust selection when data is replaced", () => {
    let items = defaultItems;
    const { result, rerender } = renderHook(() =>
      useSelection(items, ["1", "2"])
    );

    expect(result.current.selection).to.deep.equal(["1", "2"]);

    items = [
      {
        id: "2",
        name: "John",
      },
      {
        id: "3",
        name: "George",
      },
    ];

    rerender();

    expect(result.current.selection).to.deep.equal(["2"]);
  });
});
