import { requests } from "../request/index";

export async function accMan(page, pageSize, token) {
  return requests.get(
    {
      url: `/user/page?page=${page}&pageSize=${pageSize}`,
    },
    token
  );
}
