import { requests } from "../request/index";

export async function deleteAnn(id) {
  return requests.delete(
    {
      url: `/notification/delete`,
      data: {
        id,
      },
    },
    localStorage.getItem("token")
  );
}
