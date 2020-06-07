// export const ADD = 'ADD';
// export const DELETE = 'DELETE';

//添加收藏状态
export const addid = id => {
  return {
    type: 'ADD',
    id
  }
}

// 取消收藏状态
export const deleteid = id => {
  return {
    type: 'DELETE',
    id
  }
}
