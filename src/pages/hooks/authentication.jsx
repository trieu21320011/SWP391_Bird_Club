class Authentication {
    constructor() {

    }

    isAuthentication() {
        const token = localStorage.getItem('accessToken')
        return token
    }
}

const authentication = new Authentication()
export {authentication}