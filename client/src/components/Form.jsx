import './Form.modules.css'

export function Form({ formName }) {
    const forms = {
        login: [
            { type: "email", label: "Имейл" },
            { type: "password", label: "Парола" }
        ],
        register: [
            { type: "text", label: "Име" },
            { type: "text", label: "Фамилия" },
            { type: "email", label: "Имейл" },
            { type: "text", label: "Мобилен телефон" },
            { type: "password", label: "Парола" },
            { type: "password", label: "Повтори парола" }
        ]
    };

    return (
        <div className="form-container">
            <form>
                {forms[formName].map(el => (
                    <>
                        <label>{el.label}</label>
                        <input type={el.type}></input>
                    </>
                ))}
                <button>{formName === "login" ? "Влез" : "Регистрация"}</button>
            </form>
        </div>
    );
}
