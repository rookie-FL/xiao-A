import { requests } from "../request";

export async function deleteAcc(username){
    return requests.delete({
        url:"user/delete/{username}"
        data:{
            username
        }
    },localStorage.getItem("token"))
}