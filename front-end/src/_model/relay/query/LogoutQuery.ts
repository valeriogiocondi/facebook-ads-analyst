export default `
    query LogoutQuery($token: String) { 
        
        logout (
            token: $token
        )
    }
`;