import React, { useState } from 'react';

function DepositForm() {
  const [phone, setPhone] = useState('');
  const [amount, setAmount] = useState('');
  const [result, setResult] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('https://yourbackend.com/api/stkpush', { // <-- Update to your actual backend URL
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone, amount }),
    });
    const data = await res.json();
    setResult(JSON.stringify(data));
  };

  return (
    <div>
      <img src="/helakenya_icon.png" alt="HelaKenya Logo" width={64} height={64} />
      <h2>Deposit via STK Push</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Phone Number"
          value={phone}
          onChange={e => setPhone(e.target.value)}
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={e => setAmount(e.target.value)}
        />
        <button type="submit">Deposit</button>
      </form>
      <div>{result}</div>
    </div>
  );
}

export default DepositForm;
