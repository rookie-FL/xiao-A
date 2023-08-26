export async function deleteAssessment(id, token) {
    try {
      const response = await fetch(`http://localhost:8080/web/assess/delete`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'token': token,
        },
        body: JSON.stringify({
          id: id,
        }),
      });
  
      return response;
    } catch (error) {
      throw new Error('发生错误');
    }
  }
  