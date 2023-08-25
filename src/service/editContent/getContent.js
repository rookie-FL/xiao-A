import { requests } from "../request/index";

export async function saveContent(data, token) {
  return requests.post(
    {
      url: "/web/assess/add",
      data: data,
    },
    token
  );
}
