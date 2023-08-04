import { requests } from "../request/index";

export function releaseAnn(datas) {
  let token = localStorage.getItem("token");
  return requests.post(
    {
      url: `/notification/add`,
      data: datas,
    },
    token
  );
}
