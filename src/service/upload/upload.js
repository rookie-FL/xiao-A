import { requests } from "../request";

export async function uploadFile(files) {
  return requests.postFile(
    {
      url: "/assess/uploadfile",
      data: {
        file: files,
      },
    },
    localStorage.getItem("token")
  );
}
