import jwtDecode from "jwt-decode";
// 解析token
export function anyToken() {
  const code = jwtDecode(localStorage.getItem("token"));
  let info = JSON.parse(code.sub);
  // console.log("打印解析后的token", info);
  return info;
}
