import React, {useReducer} from 'react';
import './Formulario.css';

const Formulario = () => {

    const initialState = {
        firstName: {
            value: '',
            error: null
        },
        lastName: {
            value: '',
            error: null
        },
        email: {
            value: '',
            error: null
        }
    }

    function reducer(state,action) {
        let auxError = null;
        if(action.type === "firstName" && action.payload.length < 3) auxError = "Los nombres deben tener como minimo 3 caracteres";

        if(action.type === "lastName" && action.payload.length < 3) auxError = "Los apellidos deben tener como minimo 3 caracteres";

        if(action.type === "email" && !ValidateEmail(action.payload)) auxError = "El correo es invalido";

        return {
            ...state,
            [action.type] : { value : action.payload, error : auxError}
        }
    }

    function ValidateEmail(texto)
    {
        var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if(texto.match(mailformat)) return true;
        else return false;
    }

    const [state,dispatch] = useReducer(reducer,initialState);

    function handleChange(e) {
        const {name,value} = e.target;
        dispatch({
            type:name,
            payload:value
        });
    }

    return (
        <div>
            <form>
                <div className="agrupar">
                    <label className="labelForm">First Name</label>
                    <input className="campo" name="firstName" onChange={handleChange}/>
                </div>
                {state.firstName.error !== null && (
                    <p className="error">{state.firstName.error}</p>
                )}
                <div className="agrupar">
                    <label className="labelForm">Last Name</label>
                    <input className="campo" name="lastName" onChange={handleChange}/>
                </div>
                {state.lastName.error !== null && (
                    <p className="error">{state.lastName.error}</p>
                )}
                <div className="agrupar">
                    <label className="labelForm">Email</label>
                    <input className="campo" name="email" onChange={handleChange}/>
                </div>
                {state.email.error !== null && (
                    <p className="error">{state.email.error}</p>
                )}
                <button className="botoncito" type='submit'>Submit</button>
            </form>
        </div>
    )
}

export default Formulario;