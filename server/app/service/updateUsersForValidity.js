export const updateUsersForValidity= async (data)=>{

    const users=data.users;

    // let newUsers=[];

    // users.filter()
    
    const ValidUsers = users.filter((user) => user.statusCode === 1);

    return {users:ValidUsers};

}