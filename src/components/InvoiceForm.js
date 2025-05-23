import React, { useState, useEffect, useCallback } from 'react';
import InvoiceItem from './InvoiceItem';
import InvoiceModal from './InvoiceModal';
import '../invoice.css';

const InvoiceForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currency, setCurrency] = useState('₹');
  const [dateOfIssue, setDateOfIssue] = useState('');
  const [invoiceNumber, setInvoiceNumber] = useState(1);
  const [billTo, setBillTo] = useState('');
  const [billToEmail, setBillToEmail] = useState('');
  const [billToAddress, setBillToAddress] = useState('');
  const [billFrom, setBillFrom] = useState('');
  const [billFromEmail, setBillFromEmail] = useState('');
  const [billFromAddress, setBillFromAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [subTotal, setSubTotal] = useState('0.00');
  const [taxRate, setTaxRate] = useState('');
  const [taxAmmount, setTaxAmmount] = useState('0.00');
  const [discountRate, setDiscountRate] = useState('');
  const [discountAmmount, setDiscountAmmount] = useState('0.00');
  const [total, setTotal] = useState('0.00');

  const [items, setItems] = useState([
    { id: 0, name: '', description: '', price: '1.00', quantity: 1 }
  ]);

  useEffect(() => {
    calculateTotal();
  }, [items, taxRate, discountRate]);

  const editField = (setter) => (event) => {
    setter(event.target.value);
  };

  const handleAddItem = useCallback(() => {
    const id = (new Date() + Math.floor(Math.random() * 999999)).toString(36);
    setItems((prevItems) => [...prevItems, { id, name: '', description: '', price: '1.00', quantity: 1 }]);
  }, []);

  const handleDeleteItem = useCallback((itemToDelete) => {
    setItems((prevItems) => prevItems.filter(item => item.id !== itemToDelete.id));
  }, []);

  const handleItemChange = useCallback((updatedItem) => {
    setItems((prevItems) => prevItems.map(item => (item.id === updatedItem.id ? updatedItem : item)));
  }, []);

  const calculateTotal = () => {
    const sub = items.reduce(
      (acc, item) => acc + parseFloat(item.price) * parseInt(item.quantity || 1),
      0
    );
    const tax = (sub * (parseFloat(taxRate) || 0)) / 100;
    const discount = (sub * (parseFloat(discountRate) || 0)) / 100;
    const totalValue = sub + tax - discount;

    setSubTotal(sub.toFixed(2));
    setTaxAmmount(tax.toFixed(2));
    setDiscountAmmount(discount.toFixed(2));
    setTotal(totalValue.toFixed(2));
  };

  const openModal = (e) => {
    e.preventDefault();
    calculateTotal();
    setIsOpen(true);
  };

  return (
    <>
    <center style={{ fontSize: '2rem', marginBottom: '1rem',fontWeight:"Bold",fontFamily:"Roboto",marginBottom:"-30px",padding:"0px"}}>INVOICE GENERATOR</center>
    <form onSubmit={openModal} className="invoice-form">
      <div className="form-row">
        <div className="form-col-9">
          <div className="card">
            <div className="header">
              <div width={100}>
                <p><strong>Current Date:</strong> {new Date().toLocaleDateString()}</p>
                <div className="input-group">
                  <label><strong>Due Date:</strong></label>
                  <input type="date" value={dateOfIssue} onChange={editField(setDateOfIssue)} required />
                </div>
              </div>
              <div className="input-group" maxWidth={100}>
                <label><strong>Invoice Number:</strong></label>
                <input type="number" value={invoiceNumber} onChange={editField(setInvoiceNumber)} min="1" required />
              </div>
            </div>

            <hr />

            <div className="form-row">
              <div className="form-col">
                <label><strong>Bill to:</strong></label>
                <input type="text" placeholder="Who is this invoice to?" value={billTo} onChange={editField(setBillTo)} required />
                <input type="email" placeholder="Email address" value={billToEmail} onChange={editField(setBillToEmail)} required />
                <input type="text" placeholder="Billing address" value={billToAddress} onChange={editField(setBillToAddress)} required />
              </div>
              <div className="form-col">
                <label><strong>Bill from:</strong></label>
                <input type="text" placeholder="Who is this invoice from?" value={billFrom} onChange={editField(setBillFrom)} required />
                <input type="email" placeholder="Email address" value={billFromEmail} onChange={editField(setBillFromEmail)} required />
                <input type="text" placeholder="Billing address" value={billFromAddress} onChange={editField(setBillFromAddress)} required />
              </div>
            </div>

            <InvoiceItem
              items={items}
              onItemizedItemEdit={handleItemChange}
              onRowAdd={handleAddItem}
              onRowDel={handleDeleteItem}
              currency={currency}
            />

            <div className="summary">
              <p><strong>Subtotal:</strong> {currency}{subTotal}</p>
              <p><strong>Discount:</strong> {discountRate || 0}% {currency}{discountAmmount}</p>
              <p><strong>Tax:</strong> {taxRate || 0}% {currency}{taxAmmount}</p>
              <hr />
              <p><strong>Total:</strong> {currency}{total}</p>
            </div>

            <label><strong>Notes:</strong></label>
            <textarea value={notes} onChange={editField(setNotes)} placeholder="Thanks for your business!" />
          </div>
        </div>

        <div className="form-col-3">
          <button type="submit">Review Invoice</button>

          <InvoiceModal
            showModal={isOpen}
            closeModal={() => setIsOpen(false)}
            info={{
              currency, dateOfIssue, invoiceNumber,
              billTo, billToEmail, billToAddress,
              billFrom, billFromEmail, billFromAddress,
              notes
            }}
            items={items}
            currency={currency}
            subTotal={subTotal}
            taxAmmount={taxAmmount}
            discountAmmount={discountAmmount}
            total={total}
          />

          <label><strong>Currency:</strong></label>
          <select onChange={(e) => setCurrency(e.target.value)} value={currency}>
            <option value="₹">INR</option>
            <option value="$">USD</option>
            <option value="£">GBP</option>
            <option value="¥">JPY</option>
            <option value="$">CAD</option>
            <option value="$">AUD</option>
            <option value="$">SGD</option>
            <option value="¥">CNY</option>
            <option value="₿">BTC</option>
          </select>

          <label><strong>Tax rate (%):</strong></label>
          <input type="number" min="0" max="100" step="0.01" value={taxRate} onChange={editField(setTaxRate)} />

          <label><strong>Discount rate (%):</strong></label>
          <input type="number" min="0" max="100" step="0.01" value={discountRate} onChange={editField(setDiscountRate)} />
        </div>
      </div>
    </form>
    </>
  );
};

export default InvoiceForm;
