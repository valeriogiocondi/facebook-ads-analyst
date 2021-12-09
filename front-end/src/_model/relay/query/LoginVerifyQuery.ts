export default `
    query LoginVerifyQuery($token: String) { 
        
        loginVerify (
            token: $token
        )
    }
`;