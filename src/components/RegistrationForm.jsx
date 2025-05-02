const RegistrationForm = () => {
    console.log("Rendering registration form")
    return(

        <>
        <form className="d-flex flex-column">
            <label>First name:</label>
            <input required placeholder="your name"/>

            <label>Last name:</label>
            <input required placeholder="your last name"/>

            <label>Username:</label>
            <input required placeholder="username"/>

            <label>Email address:</label>
            <input required placeholder="your email" type="email"/>
            <label>Password:</label>
            <input required placeholder="Insert password" type="password"/>
            <label>Confirm Password:</label>
            <input required placeholder="Confirm Password" type="password"/>
             
             <label>Profile image:</label>
             <input type="image" />

             <button>Sign in</button>
        </form>
        </>
    )
}
export default RegistrationForm;