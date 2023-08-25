export async function getUserInfo(params) {
  try {
    const response = await fetch('/web/user/info', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'token': params.token,
      },
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error('请求失败');
    }
  } catch (error) {
    throw new Error('发生错误');
  }
}
