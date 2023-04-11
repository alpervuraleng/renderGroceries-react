import React, { Fragment, useState } from 'react';

function SearchBar({editSearchText, toggleStockFilter}) {
  return (
    <form>
      <input 
        type="text"
        placeholder="Search groceries" 
        onChange={(e) => editSearchText(e.target.value)}
      >
      </input>
      <label>
      <input 
        type="checkbox"
        onChange={(e) => toggleStockFilter()}
      />  
       Filter to in stock only
      </label>
    </form>
  );
}

function ProductCategoryRow({ name }) {
  return (
    <tr>
      <th colSpan="2">
        {name}
      </th>
    </tr>
  );
}

function ProductRow({ product }) { 
  const name = product.stocked ? product.name : 
    <span style={{color: 'red'}}>
      {product.name}
    </span>;

  return (
    <tr>
      <td>
        {name}
      </td>
      <td>
        {product.price}
      </td>
    </tr>
  );
}

function ProductTable({ products, filterText, stockFilterActive }) {
  const rows = [];
  let lastCategory = null;
  products.forEach((product) => {
    if (stockFilterActive && !product.stocked) {
      return;
    }

    if (filterText && 
          product.name.toLowerCase().indexOf(
          filterText.toLowerCase()) === -1
    ) {
      return;
    }

    if (product.category !== lastCategory) {
      rows.push(
        <ProductCategoryRow
          name={product.category}
          key={product.category}
        />
      );
      lastCategory = product.category;
    }
    rows.push(
      <ProductRow
        product={product}
        key={product.name}
      />
    );
  });

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

export function FilterableProductTable({products}) {
  const [stockFilterActive, setStockFilterActive] = useState(false);
  const [filterText, setFilterText] = useState(null);

  function toggleStockFilter() {
    setStockFilterActive(!stockFilterActive);
  }

  function editSearchText(text) {
    setFilterText(text);
  }

  return (
    <Fragment>
      <SearchBar 
        toggleStockFilter={toggleStockFilter}
        editSearchText={editSearchText}
      />
      <ProductTable 
        products={products}
        stockFilterActive={stockFilterActive}
        filterText={filterText}
      />
    </Fragment>
  );
}

const staticProducts = [
  {category: "Fruits", price: "$1", stocked: true, name: "Apple"},
  {category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit"},
  {category: "Fruits", price: "$2", stocked: false, name: "Passionfruit"},
  {category: "Vegetables", price: "$2", stocked: true, name: "Spinach"},
  {category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin"},
  {category: "Vegetables", price: "$1", stocked: true, name: "Peas"}
];

export default function App() {
  return (<FilterableProductTable products={staticProducts}/>);
}