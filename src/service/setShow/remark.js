export async function addRemark(token, openid, remark) {
    try {
      const response = await fetch(`/web/user/remark?openid=${openid}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'token': token,
        },
        body: JSON.stringify({
          remark: remark,
        }),
      });
  
      if (response.ok) {
        console.log('备注添加成功');
      } else {
        console.error('添加备注失败');
      }
    } catch (error) {
      console.error('发生错误', error);
    }
  }
  