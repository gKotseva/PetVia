import './Form.modules.css'

export function Form({ formName }) {
    const forms = {
        login: [
            { type: "email", label: "Email" },
            { type: "password", label: "Password" }
        ],
        register: [
            { type: "text", label: "First Name" },
            { type: "text", label: "Last Name" },
            { type: "email", label: "Email" },
            { type: "text", label: "Mobile Phone" },
            { type: "password", label: "Password" },
            { type: "password", label: "Repeat Password" }
        ]
    };

    return (
        <div className="form-container">
            <h2 className='form-heading'>{formName}</h2>
            <form>
                {forms[formName].map((el, index) => (
                    <>
                        <label>{el.label}</label>
                        <input type={el.type}></input>
                    </>
                ))}
                <button>{formName === "login" ? "Login" : "Register"}</button>
            </form>
        </div>
    );
}
