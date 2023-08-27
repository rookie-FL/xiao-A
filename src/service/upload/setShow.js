import { requests } from "../request";

export function setShow(content, publish) {
  return requests.post(
    {
      url: `/swiper?publish=${publish}`,
      data: content,
    },
    localStorage.getItem("token")
  );
}
