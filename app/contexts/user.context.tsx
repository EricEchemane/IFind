import { IUser } from 'db/schemas/user';
import { useContext, useReducer } from 'react';
import { createContext } from 'react';

interface DispatchConfig {
    type: "set user" | "sign in";
    payload: any;
}

interface IUserContext {
    user: IUser;
    dispatch: (config: DispatchConfig) => void;
}

interface ProviderProps {
    children: JSX.Element;
}

const UserContext = createContext<any>(null);
export const useUserContext = () => useContext<IUserContext>(UserContext);

export default function UserContextProvider(props: ProviderProps) {
    const [state, dispatch] = useReducer(reducer, undefined);
    return (
        <UserContext.Provider value={{ user: state, dispatch }}>
            {props.children}
        </UserContext.Provider>
    );
}

function reducer(state: IUser, { type, payload }: DispatchConfig) {
    if (type === "set user") {
        return payload;
    }
    else if (type === "sign in") {
        fetch('/api/user/sign-in', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ password: payload })
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) return data.data;
                return state;
            });
    }
    return state;
}