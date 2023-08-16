import { requests } from "../request/index";

export async function get() {
  return requests.delete(
    {
      url: `web/assess/delete`,
      data: {
        id: '1690601021648154626',
        assessGroup: 0,
      },
    },
  );
}


// async get() {

//     axios({
//      method: "post",
//      url: "http://119.29.250.245:8080/web/assess/get",
//      data: {
//        id: '1683029759398920193',
//        assessGroup: 0,
//      },
//      headers: {
//        'Content-Type': 'application/json',
//        'token': useLoginStore().token,
//      }
//    }).then((result) => {
//      console.log(result.data);
//    })



//  },