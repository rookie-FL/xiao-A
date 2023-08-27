import { requests } from "../request";

export function getShow(publish) {
  return requests.get(
    {
      url: `/swiper?publish=${publish}`,
    },
    localStorage.getItem("token")
  );
}
