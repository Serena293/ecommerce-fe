import { useState } from 'react';

const OrderPage = () => {
  const [location, setLocation] = useState('UK');
  const [ukPostcode, setUkPostcode] = useState('');
  const [ukAddress, setUkAddress] = useState('');
  const [internationalAddress, setInternationalAddress] = useState('');

  // Regex per validazione UK postcode
  const validateUKPostcode = (postcode) => {
    const ukPostcodeRegex = /^([A-Za-z][A-Ha-hJ-Yj-y]?[0-9][A-Za-z0-9]? ?[0-9][A-Za-z]{2}|[Gg][Ii][Rr] ?0[Aa]{2})$/;
    return ukPostcodeRegex.test(postcode);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (location === 'UK') {
      if (!validateUKPostcode(ukPostcode)) {
        alert('Please enter a valid UK postcode');
        return;
      }
      if (!ukAddress.trim()) {
        alert('Please enter your full UK address');
        return;
      }
    }
    // Invia i dati al backend
    console.log({
      location,
      ...(location === 'UK' && {
        ukPostcode,
        ukAddress
      }),
      ...(location === 'Internationally' && {
        internationalAddress
      })
    });
  };

  return (
    <>
      <h1 className="text-center mt-5">Commission Paint</h1>
      <form className="d-flex flex-column m-5" onSubmit={handleSubmit}>
        <label>Name:</label>
        <input placeholder="Insert Your Name" required />
        
        <label>Where are you based?</label>
        <select 
          value={location} 
          onChange={(e) => setLocation(e.target.value)}
          required
        >
          <option value="UK">UK</option>
          <option value="Internationally">Internationally</option>
          <option value="Digital">Digital</option>  
        </select>

        {location === 'UK' && (
          <>
            <label>UK Postcode:</label>
            <input
              placeholder="e.g. SW1A 1AA"
              value={ukPostcode}
              onChange={(e) => setUkPostcode(e.target.value.toUpperCase())}
              required
            />
            {ukPostcode && !validateUKPostcode(ukPostcode) && (
              <p className="text-danger">Please enter a valid UK postcode</p>
            )}

            <label>Full UK Address:</label>
            <textarea
              placeholder="Include street, city and county"
              value={ukAddress}
              onChange={(e) => setUkAddress(e.target.value)}
              required
              rows={3}
            />
          </>
        )}

        {location === 'Internationally' && (
          <>
            <label>Full International Address:</label>
            <textarea
              placeholder="Include street, city, postcode and country"
              value={internationalAddress}
              onChange={(e) => setInternationalAddress(e.target.value)}
              required
              rows={4}
            />
          </>
        )}

        <label>Description:</label>
        <textarea 
          placeholder="Describe your idea, include as many details as possible" 
          required
        />

        <div className="d-flex justify-content-center mt-2">
          <button type="submit" className="border-0 btn btn-sm btn-dark w-auto fs-4">
            Send
          </button>
        </div>
      </form>
    </>
  );
};

export default OrderPage;