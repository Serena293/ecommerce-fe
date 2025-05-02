import { useState } from 'react';

const RegistrationForm = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        avatarUrl: ''
    });
    const [error, setError] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [successMessage, setSuccessMessage] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);
        setSuccessMessage(null);
    
        // Validazione lato client
        if (formData.password !== formData.confirmPassword) {
            setError("Passwords don't match");
            setIsSubmitting(false);
            return;
        }
    
        try {
            const registrationUrl = "http://localhost:8080/api/users/register";
            const response = await fetch(registrationUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    username: formData.username,
                    email: formData.email,
                    password: formData.password,
                    confirmPassword: formData.confirmPassword,
                    avatarUrl: formData.avatarUrl
                })
            });

            const responseText = await response.text();
            
            let responseData = {};
            try {
                responseData = responseText ? JSON.parse(responseText) : {};
            } catch (parseError) {
                console.warn("Failed to parse response as JSON:", responseText);
                // Se il parsing fallisce ma la risposta è positiva, consideriamo comunque successo
                if (response.ok) {
                    setSuccessMessage("Registration successful!");
                    resetForm();
                    return;
                }
            }

            if (!response.ok) {
                const errorMsg = responseData.message || 
                               responseData.error || 
                               responseText || 
                               `Registration failed with status ${response.status}`;
                throw new Error(errorMsg);
            }

            // Successo
            setSuccessMessage(responseData.message || "Registration successful!");
            resetForm();
            
        } catch (error) {
            console.error("Registration error:", error);
            setError(error.message || 'Registration failed. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const resetForm = () => {
        setFormData({
            firstName: '',
            lastName: '',
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
            avatarUrl: ''
        });
    };

    return (
        <div className="registration-form m-5">
            <h2>Create Account</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            {successMessage && <div className="alert alert-success">{successMessage}</div>}
            
            <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
                <div className='d-flex flex-column'>
                    <label>First name:</label>
                    <input 
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required 
                        placeholder="Your name"
                    />
                </div>

                <div className='d-flex flex-column'>
                    <label>Last name:</label>
                    <input 
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required 
                        placeholder="Your last name"
                    />
                </div>

                <div className='d-flex flex-column'>
                    <label>Username:</label>
                    <input 
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required 
                        placeholder="Username"
                    />
                </div>

                <div className='d-flex flex-column'>
                    <label>Email address:</label>
                    <input 
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required 
                        placeholder="Your email"
                    />
                </div>

                <div className='d-flex flex-column'>
                    <label>Password:</label>
                    <input 
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        required 
                        placeholder="Password"
                        minLength="6"
                    />
                </div>

                <div className='d-flex flex-column'>
                    <label>Confirm Password:</label>
                    <input 
                        name="confirmPassword"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required 
                        placeholder="Confirm password"
                    />
                </div>
                <div className='d-flex flex-column'>
                    <label>Select avatar:</label>
                    <input type='file'/>

                </div>

                <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="btn btn-primary"
                >
                    {isSubmitting ? 'Registering...' : 'Register'}
                </button>
            </form>
        </div>
    );
};

export default RegistrationForm;