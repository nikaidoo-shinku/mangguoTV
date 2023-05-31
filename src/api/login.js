import service from "./http.js";

// 登录
export function getLogin(data) {
  return service({
    url: "/login",
    method: "post",
    withCredentials: true,
    data,
  });
}
