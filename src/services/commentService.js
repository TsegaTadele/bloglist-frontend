/* eslint-disable linebreak-style */
const API_URL = '/api/blogs'

const addCommentToBlog = async ({blogId, comment}) => {

  const response = await fetch(`${API_URL}/${blogId}/comments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ comment }),
  })

  if (!response.ok) {
    throw new Error('Failed to add comment')
  }

  return await response.json()
}

export default { addCommentToBlog }