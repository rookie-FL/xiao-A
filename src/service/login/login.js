import { requests } from "../request/index";

export function accountLogin(username, password) {
  return requests.post({
    url: "/user/login",
    data: {
      username,
      password,
    },
  });
}
