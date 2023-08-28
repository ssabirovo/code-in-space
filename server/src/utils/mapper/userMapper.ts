import {ROLE} from "../../models/UserModel";


interface UserDto {
    email: string,
    id: string,
    role: ROLE,
}

const userMapper = (user): UserDto => {
    return {
        email: user.email || '',
        id: user._id || '',
        role: user.role || ROLE.USER,
    }
}

export {userMapper}