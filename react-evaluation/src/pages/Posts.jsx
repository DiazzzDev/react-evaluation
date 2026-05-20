import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import Nav from '../components/Navbar'
import PostForm from '../components/PostForm'
import ConfirmModal from '../components/ConfirmModal'

const posts = [
  {
    "userId": 1,
    "id": 1,
    "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
    "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
  },
  {
    "userId": 1,
    "id": 2,
    "title": "qui est esse",
    "body": "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla"
  },
  {
    "userId": 1,
    "id": 3,
    "title": "ea molestias quasi exercitationem repellat qui ipsa sit aut",
    "body": "et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut"
  }
]

const Posts = () => {
  const [post, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const token = localStorage.getItem('fakestore_token') || sessionStorage.getItem('fakestore_token')

  useEffect(() => {
    if (!token) {
      navigate('/')
      return
    }

    const fetchPosts = async () => {
      try {
        const data = await response.json()
        setPosts(data.map((product) => ({ ...product, source: 'api' })))
      } catch (err) {
        setError(err.message || 'No se pudieron cargar los productos')
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [navigate, token])

  const handleEditProduct = async (productId) => {
    setProductError('')
    setLoadingProductDetail(true)

    const localProduct = products.find((product) => product.id === productId)
    if (localProduct) {
      setEditingPost(localProduct)
      setShowPostForm(true)
      setLoadingPostDetail(false)
      return
    }

    try {
      const response = await fetch(`https://fakestoreapi.com/products/${productId}`)
      if (!response.ok) {
        throw new Error('Error al cargar el producto')
      }

      const data = await response.json()
      setEditingPost({ ...data, source: 'api' })
      setShowPostForm(true)
    } catch (err) {
      setPostError(err.message || 'No se pudo cargar el producto')
    } finally {
      setLoadingPostDetail(false)
    }
  }

  const handleUpdatePost = async (formData) => {
    setPosttError('')
    setPostSuccess('')
    setPostSubmitting(true)

    const isLocalPost = editingPost?.source !== 'api'

    try {
      if (isLocalProduct) {
        // Actualiza directamente el producto local sin llamar a la API.
        setPosts((prev) =>
          prev.map((p) =>
            p.id === editingProduct.id ? { ...p, ...formData, source: p.source || 'local' } : p
          )
        )
        setProductSuccess('Producto actualizado correctamente.')
        setShowPostForm(false)
        setEditingProduct(null)
        return
      }

      const response = await fetch(`https://fakestoreapi.com/products/${editingProduct.id}`, {
      })

      if (!response.ok) {
        const text = await response.text()
        throw new Error(text || 'Error actualizando post')
      }

      const data = await response.json()
      setProducts((prev) =>
        prev.map((p) => (p.id === editingProduct.id ? { ...data, source: 'api' } : p))
      )
      setPostSuccess('Producto actualizado correctamente.')
      setShowPostForm(false)
      setEditingPost(null)
    } catch (err) {
      setProductError(err.message || 'No se pudo actualizar el post')
    } finally {
      setProductSubmitting(false)
    }
  }

  const handleDeletePost = async (postId) => {
    setPostToDelete(postId)
    setShowDeleteConfirm(true)
  }

  const confirmDeletePost = async () => {
    if (!postToDelete) return

    setPostError('')
    setPostSuccess('')
    setShowDeleteConfirm(false)

    try {
      const post = post.find((p) => p.id === productToDelete)
      if (post?.source !== 'api') {
        setPosts((prev) => prev.filter((p) => p.id !== productToDelete))
        setPostSuccess('Post eliminado correctamente.')
        setPostToDelete(null)
        return
      }

      const response = await fetch(`https://fakestoreapi.com/products/${productToDelete}`, {
        method: 'DELETE'
      })

      if (!response.ok) {
        const text = await response.text()
        throw new Error(text || 'Error eliminando post')
      }

      setProducts((prev) => prev.filter((p) => p.id !== productToDelete))
      setPostSuccess('Producto eliminado correctamente.')
      setProductToDelete(null)
    } catch (err) {
      setPostError(err.message || 'No se pudo eliminar el post')
      setProductToDelete(null)
    }
  }

  const cancelDeletePosts = () => {
    setShowDeleteConfirm(false)
    setProductToDelete(null)
  }

  const [showPostForm, setShowPostForm] = useState(false)
  const [postSubmitting, setPostSubmitting] = useState(false)
  const [postError, setPostError] = useState('')
  const [postSuccess, setPostSuccess] = useState('')
  const [editingPost, setEditingPost] = useState(null)
  const [loadingPostDetail, setLoadingPostDetail] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [postToDelete, setPostToDelete] = useState(null)

  const handleCreateProduct = async (formData) => {
    setPostError('')
    setPostSuccess('')
    setPostSubmitting(true)

    try {
      const response = await fetch('https://fakestoreapi.com/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (!response.ok) {
        const text = await response.text()
        throw new Error(text || 'Error creando producto')
      }

      const data = await response.json()
      const newPost = { ...data, source: 'local' }
      setPost((prev) => [newPost, ...(prev || [])])
      setPostSuccess('Post creado correctamente. ID: ' + (newPost.id || '—'))
      setShowPostForm(false)
      setEditingPost(null)
    } catch (err) {
      setPostError(err.message || 'No se pudo crear el post')
    } finally {
      setPostSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {token && <Nav />}

      <main className="container mx-auto px-4 py-8">
        <div className="mb-6 space-y-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-semibold text-slate-900">Posts</h1>
            </div>
            <div className="flex items-center gap-4">
              <div>
                <button
                  type="button"
                  onClick={() => {
                    setEditingPost(null)
                    setShowPostForm((s) => !s)
                  }}
                  className="rounded-2xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-500"
                >
                  Nuevo post
                </button>
              </div>
            </div>
          </div>
        </div>
        {postError && <div className="mb-4 rounded-2xl bg-rose-50 px-4 py-3 text-rose-700">{postError}</div>}
        {postSuccess && <div className="mb-4 rounded-2xl bg-emerald-50 px-4 py-3 text-emerald-700">{postSuccess}</div>}

        {showPostForm && (
          <PostForm
            initialData={editingPost || {}}
            categories={categories}
            onSubmit={editingPost ? handleUpdatePost : handleCreatePost}
            submitting={postSubmitting || loadingPostDetail}
            onClose={() => {
              setShowPostForm(false)
              setEditingPost(null)
            }}
          />
        )}

        <ConfirmModal
          title="Confirmar eliminación"
          message="¿Estás seguro de que deseas eliminar este post?"
          isOpen={showDeleteConfirm}
          isDangerous={true}
          onConfirm={confirmDeletePosts}
          onCancel={cancelDeletePosts}
        />

        <div className="overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-slate-200">
          <div className="border-b border-slate-200 px-6 py-4 bg-slate-100">
            <h2 className="text-lg font-medium text-slate-900">Posts</h2>
          </div>

          <div className="p-4">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200 text-left">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="px-6 py-3 text-sm font-semibold uppercase tracking-wide text-slate-500">Título</th>
                      <th className="px-6 py-3 text-sm font-semibold uppercase tracking-wide text-slate-500">Descripción</th>
                      <th className="px-6 py-3 text-sm font-semibold uppercase tracking-wide text-slate-500">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 bg-white">
                    {currentPosts.map((post) => (
                      <tr key={post.id} className="hover:bg-slate-50">
                        <td className="px-6 py-4 align-top text-sm text-slate-700 max-w-xl wrap-break-word">{post.title}</td>
                        <td className="px-6 py-4 align-top text-sm text-slate-600 max-w-2xl wrap-break-word">{post.description}</td>
                        
                        <td className="px-6 py-4 align-top text-sm text-slate-700">
                          <div className="flex flex-wrap gap-2">
                            <button
                              type="button"
                              onClick={() => handleEditProduct(post.id)}
                              disabled={loadingProductDetail}
                              className="rounded-full w-full bg-blue-600 px-3 py-1 text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-400"
                            >
                              Editar 
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteProduct(post.id)}
                              className="rounded-full w-full bg-red-600 px-3 py-1 text-white transition hover:bg-red-700"
                            >
                              Eliminar 
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Posts