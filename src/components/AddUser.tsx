import { useReducer, createContext } from 'react';
import { useForm } from '../hooks/useForm';
import { types } from '../types/types';

interface IUser {
  id: number;
  email: string;
  phone: number
}

export const UsersContext = createContext({});

export const InitialStateUsersReducer = {
  users: []
}

export const usersReducer = (state: any, action: any) => {
  switch (action.type) {
    case types.ADD_USER:
      return {
        ...state,
        users: [...state.users, action.payload]
      }
    case types.DELETE_USER:
      return {
        ...state,
        users: state.users.filter((user: IUser) => user.id !== action.payload)
      }   
    default:
      return;
  }
}

const AddUser = () => {

  const [state, dispatch] = useReducer(usersReducer, InitialStateUsersReducer);

  const createUser = (): IUser => {
    const id = Date.now();
    const newUser = {
      id: id,
      email: values.email,
      phone: values.phone
    };
    return newUser;
  };
  
  const addUser = () => {
    const newUser = createUser();
    dispatch({
      type: types.ADD_USER,
      payload: newUser
    });
  };

  const removeUser = (id: number) => {
    dispatch({
      type: types.DELETE_USER,
      payload: id
    });
  };

  const [values, handleChange, handleSubmit] = useForm({
    email: '',
    phone: ''
  }, addUser);

  return (
    <>
      <UsersContext.Provider value={{
        state,
        dispatch
      }}>
      </UsersContext.Provider>
  
      <div>AddUser</div>
      <form onSubmit={handleSubmit}>
        <input 
          type="email" 
          name="email" 
          value={values.email} 
          onChange={handleChange}
          placeholder="email"
        />
        <input 
          type="number" 
          name="phone" 
          value={values.phone} 
          onChange={handleChange}
          placeholder="phone"
        />
        <input 
          type="submit" 
          value="Add User"
        />
      </form>

      <hr/>

      <div>
        <h3>Usuarios</h3>
        <ul>
          {state.users.map((user: IUser) => (
            <li key={user.id}>
              {user.email} - {user.phone}
              <button onClick={() => removeUser(user.id)}>Eliminar</button>
            </li>
            ))}
        </ul>
      </div>
    </>
  )
}

export default AddUser
