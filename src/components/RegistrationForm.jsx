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

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords don't match");
            setIsSubmitting(false);
            return;
        }

        try {
            const response = await fetch("http://localhost:8080/api/users/register", {
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

            setSuccessMessage(responseData.message || "Registration successful!");
            resetForm();

        } catch (error) {
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
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <h3 className="card-title text-center mb-4">Create Account</h3>
                            {error && <div className="alert alert-danger">{error}</div>}
                            {successMessage && <div className="alert alert-success">{successMessage}</div>}

                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label">First Name</label>
                                    <input
                                        name="firstName"
                                        className="form-control"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        required
                                        placeholder="Your name"
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Last Name</label>
                                    <input
                                        name="lastName"
                                        className="form-control"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        required
                                        placeholder="Your last name"
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Username</label>
                                    <input
                                        name="username"
                                        className="form-control"
                                        value={formData.username}
                                        onChange={handleChange}
                                        required
                                        placeholder="Username"
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Email address</label>
                                    <input
                                        name="email"
                                        type="email"
                                        className="form-control"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        placeholder="Your email"
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Password</label>
                                    <input
                                        name="password"
                                        type="password"
                                        className="form-control"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                        placeholder="Password"
                                        minLength="6"
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Confirm Password</label>
                                    <input
                                        name="confirmPassword"
                                        type="password"
                                        className="form-control"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        required
                                        placeholder="Confirm password"
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Select avatar</label>
                                    <input type="file" className="form-control" />
                                </div>

                                <div className="d-grid">
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="btn btn-primary"
                                    >
                                        {isSubmitting ? 'Registering...' : 'Register'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegistrationForm;
