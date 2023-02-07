import express from 'express'
import postModel from '../schemas/post-schema.js'

const postRouter = express.Router()

// pruebaRouter.use()

postRouter.get('/', (req, res) => {
  const { page, order, filter } = req.query

  postModel
    .paginate({}, { page: page, limit: 10, sort: { [filter]: order } })
    .then((response) => res.json(response))
    .catch((err) => res.status(404).json({ error: err }))
})

postRouter.get('/:id', (req, res) => {
  const { id } = req.params

  postModel
    .findById(id)
    .then((response) => res.json(response))
    .catch((err) => res.status(404).json({ error: err }))
})

postRouter.post('/', (req, res) => {
  const { post } = req.body
  console.log(post)
  if (!post?.username) return res.status(404).send()

  const newPost = new postModel({ ...post, likes: 0 })

  newPost.save().then((savePost) => res.json(savePost))
})

// postRouter.post('/xd', async (req, res) => {
//   const doc = await postModel.findById('63a1f70d189536dc77c4ff1d')
//   doc.likes = 4
//   await doc.save()
//   console.log(doc)
//   res.json(doc)
// })

export default postRouter
