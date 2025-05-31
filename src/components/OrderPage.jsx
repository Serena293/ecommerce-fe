import { useState } from "react";

const OrderPage = () => {
  const [location, setLocation] = useState("UK");
  const [ukPostcode, setUkPostcode] = useState("");
  const [ukAddress, setUkAddress] = useState("");
  const [internationalAddress, setInternationalAddress] = useState("");
  const [status, setStatus] = useState("");

  // Regex per validazione UK postcode
  const validateUKPostcode = (postcode) => {
    const ukPostcodeRegex =
      /^([A-Za-z][A-Ha-hJ-Yj-y]?[0-9][A-Za-z0-9]? ?[0-9][A-Za-z]{2}|[Gg][Ii][Rr] ?0[Aa]{2})$/;
    return ukPostcodeRegex.test(postcode);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validazione campi
    if (location === "UK") {
      if (!validateUKPostcode(ukPostcode)) {
        setStatus("Please enter a valid UK postcode");
        return;
      }
      if (!ukAddress.trim()) {
        setStatus("Please enter your full UK address");
        return;
      }
    }

    // Prepara i dati per Formspree
    const formData = new FormData(e.target);
    
    try {
      const response = await fetch("https://formspree.io/f/manjwlwa", {
        method: "POST",
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setStatus("Thank you! Your commission request has been sent.");
        // Resetta il form
        e.target.reset();
        setUkPostcode("");
        setUkAddress("");
        setInternationalAddress("");
      } else {
        const errorData = await response.json();
        setStatus(`Error: ${errorData.error || 'Submission failed'}`);
      }
    } catch (error) {
      setStatus("There was a problem submitting your form. Please try again.");
    }
  };

  return (
    <>
      <h1 className="text-center mt-5">Commission Paint</h1>
      <form
        className="d-flex flex-column m-5"
        onSubmit={handleSubmit}
      >
        {/* Aggiungi name attribute a tutti i campi per Formspree */}
        <label>Name:</label>
        <input 
          name="name" 
          placeholder="Insert Your Name" 
          required 
        />

        <label>Where are you based?</label>
        <select
          name="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        >
          <option value="UK">UK</option>
          <option value="Internationally">Internationally</option>
          <option value="Digital">Digital</option>
        </select>

        {location === "UK" && (
          <>
            <label>UK Postcode:</label>
            <input
              name="ukPostcode"
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
              name="ukAddress"
              placeholder="Include street, city and county"
              value={ukAddress}
              onChange={(e) => setUkAddress(e.target.value)}
              required
              rows={3}
            />
          </>
        )}

        {location === "Internationally" && (
          <>
            <label>Full International Address:</label>
            <textarea
              name="internationalAddress"
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
          name="description"
          placeholder="Describe your idea, include as many details as possible"
          required
        />

        {/* Aggiungi campo nascosto per redirect opzionale */}
        <input type="hidden" name="_subject" value="New Commission Request!" />
        <input type="hidden" name="_next" value="https://yourwebsite.com/thank-you" />

        <div className="d-flex justify-content-center mt-2">
          <button
            type="submit"
            className="border-0 btn btn-sm btn-dark w-auto fs-4"
          >
            Send
          </button>
        </div>

        {status && (
          <div className={`mt-3 text-center ${
            status.includes("Thank you") ? "text-success" : "text-danger"
          }`}>
            {status}
          </div>
        )}
      </form>
    </>
  );
};

export default OrderPage;