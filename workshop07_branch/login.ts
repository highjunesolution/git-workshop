function login(username:string) {
    if(!username) return "Username is required!"
    return `Welcome ${username}`
}