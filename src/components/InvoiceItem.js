import React from 'react';
import { BiTrash } from "react-icons/bi";

const InvoiceItem = ({ items, currency, onItemizedItemEdit, onRowAdd, onRowDel }) => {
  return (
    <div>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '1rem' }}>
        <thead>
          <tr style={{ borderBottom: '1px solid #dee2e6' }}>
            <th style={headerCellStyle}>ITEM</th>
            <th style={headerCellStyle}>QTY</th>
            <th style={headerCellStyle}>PRICE/RATE</th>
            <th style={{ ...headerCellStyle, textAlign: 'center' }}>ACTION</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <ItemRow
              key={item.id}
              item={item}
              currency={currency}
              onItemizedItemEdit={onItemizedItemEdit}
              onDelEvent={() => onRowDel(item)}
            />
          ))}
        </tbody>
      </table>
      <button
        style={buttonStyle}
        onClick={onRowAdd}
      >
        Add Item
      </button>
    </div>
  );
};

const ItemRow = ({ item, currency, onItemizedItemEdit, onDelEvent }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onItemizedItemEdit({ ...item, [name]: value });
  };

  return (
    <tr>
      <td style={{ width: '100%' }}>
        <input
          type="text"
          name="name"
          placeholder="Item name"
          value={item.name}
          onChange={handleChange}
          style={inputStyle}
        />
        <input
          type="text"
          name="description"
          placeholder="Item description"
          value={item.description}
          onChange={handleChange}
          style={inputStyle}
        />
      </td>
      <td style={{ minWidth: '70px' }}>
        <input
          type="number"
          name="quantity"
          min="1"
          step="1"
          value={item.quantity}
          onChange={handleChange}
          style={inputStyle}
        />
      </td>
      <td style={{ minWidth: '130px' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span style={{ marginRight: '4px' }}>{currency}</span>
          <input
            type="number"
            name="price"
            min="1"
            step="0.01"
            value={item.price}
            onChange={handleChange}
            style={{ ...inputStyle, textAlign: 'right' }}
          />
        </div>
      </td>
      <td style={{ textAlign: 'center', minWidth: '50px' }}>
        <BiTrash
          onClick={onDelEvent}
          style={{
            height: '33px',
            width: '33px',
            padding: '7.5px',
            color: 'white',
            backgroundColor: 'red',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        />
      </td>
    </tr>
  );
};

const headerCellStyle = {
  padding: '8px',
  textAlign: 'left',
  backgroundColor: '#f8f9fa',
  fontWeight: 'bold',
  borderBottom: '1px solid #ccc'
};

const buttonStyle = {
  fontWeight: 'bold',
  padding: '8px 16px',
  backgroundColor: '#007bff',
  border: 'none',
  color: 'white',
  borderRadius: '4px',
  cursor: 'pointer'
};

const inputStyle = {
  width: '95%',
  padding: '6px',
  marginBottom: '4px',
  border: '1px solid #ccc',
  borderRadius: '4px'
};

export default InvoiceItem;
