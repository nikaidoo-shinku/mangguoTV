import service from "./http.js";

// 视频置顶及热门评论数据
export function getcommentTop(id) {
  return service({
    url: `/commentTop/${id}`,
    method: "get",
  });
}

// 视频评论数据
export function getcomment(id) {
  return service({
    url: `/comment/${id}`,
    method: "get",
  });
}
