import axios from 'axios'
import { FieldValues } from 'react-hook-form'

import type { Post, Filter, PaginatedPost } from '../types'

const BACK_URL = 'https://twitter-clone-facundo-projects.koyeb.app'
// const BACK_URL = 'https://post-app-h399.onrender.com'

export type commentPost = {
  username: string | null | undefined
  comment: string
  userImage: string | null | undefined
  id: string
}

export const getPosts = async (
  page: number,
  filters: Filter
): Promise<PaginatedPost> => {
  const response = await axios.get(
    `${BACK_URL}/post?page=${page}&order=${filters.order}&filter=${filters.filter}`
  )

  const post = response.data

  return post
}

export const getComment = async (id: string | undefined): Promise<Post> => {
  const response = await axios.get(`${BACK_URL}/post/${id}`)

  const post = response.data

  return post
}

export const post = async (data: FieldValues): Promise<PaginatedPost> => {
  const post = await axios.post(`${BACK_URL}/post`, {
    post: data,
  })

  return post.data
}

export const postLike = async (id: string, idUser: string) => {
  await axios.post(`${BACK_URL}/post/like`, {
    id,
    idUser,
  })
}

export const postComment = async ({
  id,
  userImage,
  username,
  comment,
}: commentPost) => {
  await axios.post(`${BACK_URL}/post/comment`, {
    id,
    userImage,
    username,
    comment,
  })
}

export const deleteComment = async (id: string, idComment: string) => {
  await axios.post(`${BACK_URL}/post/delete`, {
    id,
    idComment,
  })
}
