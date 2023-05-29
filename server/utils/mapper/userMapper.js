const userMapper = (user) => {
    return {
        email: user.email || '',
        id: user._id || '',
    }
}

export {userMapper}