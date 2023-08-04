import { requests } from "../request";

export async function queryAnn(id) {
  return requests.get(
    {
      url: `/notification/get?id=${id}`,
    },
    localStorage.getItem("token")
  );
}
