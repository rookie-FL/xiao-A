import { requests } from "../request/index";

export async function deleteAnn(idi) {
  return requests.delete(
    {
      url: `/notification/delete`,
      data: {
        id: idi,
      },
    },
    localStorage.getItem("token")
  );
}
