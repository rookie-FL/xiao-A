export async function getNotifications(token, page, pageSize) {
    try {
      const response = await fetch(`http://119.29.250.245:8080/web/notification/page?page=${page}&pageSize=${pageSize}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "token": token,
        },
      });
  
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        throw new Error("获取通知公告失败");
      }
    } catch (error) {
      throw new Error("发生错误");
    }
  }
  