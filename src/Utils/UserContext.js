import { createContext } from "react"

const UserContext = createContext({
    loggedInUser: localStorage.getItem('user')
});

export default UserContext;