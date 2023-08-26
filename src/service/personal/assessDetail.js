import axios from "axios";

export async function passAssessment(token, openid, scores, currentAssessId, nextAssessId) {
  const url = `http://119.29.250.245:8080/web/assess/pass`;
  const requestBody = {
    openid: openid,
    score: scores,
    pass: true, // 根据实际情况设置
    currentAssessId: currentAssessId,
    NextAssessId: nextAssessId,
  };

  try {
    const response = await axios.post(url, requestBody, {
      headers: {
        "Content-Type": "application/json",
        "token": token,
      },
    });

    if (response.status === 200) {
      return true; // 表示成功
    } else {
      throw new Error("考核通过失败");
    }
  } catch (error) {
    console.error("发生错误", error);
    throw error;
  }
}
