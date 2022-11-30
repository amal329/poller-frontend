import authService from "../services/authService";
import { LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT, REGISER_SUCCESS, REGISTER_FAIL } from "./types";

export const logout = () => (dispath) => {
    authService.logout();

    dispath({
        type : LOGOUT
    })
}