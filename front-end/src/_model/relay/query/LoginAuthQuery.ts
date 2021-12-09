export default `
    query LoginAuthQuery($username: String!, $password: String!) { 
        
        loginAuth (
            username: $username,
            password: $password
        )
    }
`;