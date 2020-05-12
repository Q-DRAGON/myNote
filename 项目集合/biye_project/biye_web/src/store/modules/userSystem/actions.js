import { createAction } from '@/utils/help'
import {
  apiAddPost,
  apiUserPosts,
  apiExplorePosts,
  apiUserAll,
  apiUserRegister,
  apiUserEdit,
  apiUserDelete,
  apiUsersDelete,
} from "./mutation-types"

const actions = {
  addPost: createAction('post', apiAddPost),
  userPosts: createAction('post', apiUserPosts),
  explorePosts: createAction('post', apiExplorePosts),
  getAllUsers: createAction('get', apiUserAll),
  userRegister: createAction('post', apiUserRegister),
  userEdit: createAction('post', apiUserEdit),
  userDelete: createAction('post', apiUserDelete),
  userDeletes: createAction('post', apiUsersDelete)
}

export default actions
