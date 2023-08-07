import { requests } from "../request";

export async function queryAnn(id) {
  console.log("发生之前先打印id", id);
  return requests.get(
    {
      url: `/notification/get?id=${id}`,
    },
    localStorage.getItem("token")
  );
}
