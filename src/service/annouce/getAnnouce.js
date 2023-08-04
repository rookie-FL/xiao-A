import { requests } from "../request/index";

export async function getAnnouce(page, pageSize, token) {
  return requests.get(
    {
      url: `/notification/page?page=${page}&pageSize=${pageSize}`,
    },
    token
  );
}
