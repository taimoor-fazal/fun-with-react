import React from "react";
import CSS from "./list.module.css";

type ColorType = {
  id: number;
  colorName: string;
  hexValue: string;
};

const colors: ColorType[] = [
  { id: 1, colorName: "red", hexValue: "#f00" },
  { id: 2, colorName: "green", hexValue: "#0f0" },
  { id: 3, colorName: "blue", hexValue: "#00f" },
  { id: 4, colorName: "cyan", hexValue: "#0ff" },
  { id: 5, colorName: "magenta", hexValue: "#f0f" },
  { id: 6, colorName: "yellow", hexValue: "#ff0" },
  { id: 7, colorName: "black", hexValue: "#000" },
];

const renderColorItem1 = (color: ColorType) => (
  <div
    style={{
      background: color.hexValue,
      color: "#000",
      height: "300px",
      width: "400px",
      border: "2px solid #FFF",
      fontSize: "2rem",
      fontWeight: "bold",
      display: "grid",
      placeItems: "center",
    }}
  >
    {color.colorName}
  </div>
);

const renderColorItem2 = (color: ColorType) => (
  <div
    style={{
      background: color.hexValue,
      height: "80px",
      width: "80px",
      border: "2px solid #000",
      color: "white",

      fontWeight: "bold",
      display: "grid",
      borderRadius: "50%",
      placeItems: "center",
    }}
  >
    {color.colorName}
  </div>
);

export const Data: React.FC = () => {
  return (
    <div className={CSS.body}>
      <h1>Data Component</h1>
      <h2>List 1</h2>
      <List items={colors} renderItem={renderColorItem1} gap={0.5} />
      <h2>List 2</h2>
      <List
        items={colors}
        renderItem={renderColorItem2}
        className={CSS.myClass}
      />
      <h3>List as a table</h3>
      <table>
        <div>
          <tr>
            <th>Color Name</th>
            <th>Hex Value</th>
          </tr>
        </div>
        <List
          items={colors}
          renderItem={(color) => (
            <tr>
              <td>{color.colorName}</td>
              <td>{color.hexValue}</td>
            </tr>
          )}
          direction="column"
        />
      </table>
    </div>
  );
};

type ListProps<T> = {
  items: T[];
  renderItem: (item: T) => JSX.Element;
  direction?: "row" | "column";
  gap?: number;
  className?: string;
};

export const List = <T,>({
  items,
  renderItem,
  direction,
  gap = 0,
  className,
}: ListProps<T>) => {
  return (
    <div
      className={className}
      style={{
        width: "100%",
        display: "flex",
        flexDirection: direction,
        gap: `${gap}rem`,
      }}
    >
      {items.map((item, index) => renderItem(item))}
    </div>
  );
};
