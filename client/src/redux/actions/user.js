export function saveUser(data){
    return async function (dispatch){
        try{
            return await(
                dispatch({
                    type: 'SAVE_USER',
                    payload: data
                })
            )
            
        }
        catch(err){
            console.log(err)
        }
    }
}