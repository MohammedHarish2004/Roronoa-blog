import { Button, Spinner } from "flowbite-react"
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import CallToAction from "../components/CallToAction"
import CommentSection from "../components/CommentSection"
export default function PostPage() {

    const {postSlug} = useParams()
    const [post,setPost] = useState([])
    const [loading,setLoading] = useState(false)
    const [error,setError] = useState(false)

    useEffect(()=>{
        const fetchPosts = async ()=>{
           try {
            setLoading(true)

            const res = await fetch(`/api/post/getposts?slug=${postSlug}`)
            const data = await res.json()
            setPost(data.posts[0])
            setLoading(false)
            setError(false)

           } 
           catch (error) {
            setLoading(false)
            setError(error.message)
           }
        }
        fetchPosts()
    },[postSlug])

    if(loading) return(
    <div className="flex justify-center items-center min-h-screen">
        <Spinner size='xl' />
    </div>
)
    return (
    <main className="flex flex-col max-w-6xl mx-auto min-h-screen">
        <h1 className="text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl">{post && post.title}</h1>
        <Link to={`/search?category=${post && post.category}`}>
            <Button gradientDuoTone='purpleToBlue' outline pill size='xs' className="mx-auto">{post && post.category}</Button>
        </Link>
        <img src={post && post.image} alt="post" className="mt-5 p-3 max-h[600px] w-full object-cover" />
        <div className="flex justify-between p-3 border-b border-slate-300 mx-auto w-full max-w-2xl text-xs">
            <span>{new Date(post && post.createdAt).toLocaleDateString()}</span>
            {/* <span>{(post.content.length / 1000).toFixed(0) } mins read</span> */}
        </div>
        <div className="p-3 max-w-2xl self-center w-full post-content" dangerouslySetInnerHTML={{__html:post && post.content}}>

        </div>        
        <div className="max-w-4xl mx-auto w-full">
            <CallToAction />
        </div>
        <CommentSection postId = {post._id}/>
    </main>
  )
}
