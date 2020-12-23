import React , { useEffect } from 'react'
import kebabCase from "lodash.kebabcase"
import {  graphql, Link } from "gatsby"
import Img from "gatsby-image"
import Layout from "../components/layout"
import Seo from "../components/seo"
import ConcatWords from "../utils/ConcatWords"
import formatDate from "../utils/formatDate"
import B from "../components/b"

import Comment from "../components/comment"
import RecommandPost from '../components/recommendPost'

const BlogPost = ({ data, pageContext }) => {
    const { markdownRemark } = data
    const { prev, next } = pageContext

    console.log(pageContext);

    const commentBox = React.createRef()

    useEffect(() => {
      const scriptEl = document.createElement('script')
      scriptEl.async = true
      scriptEl.src = 'https://utteranc.es/client.js'
      scriptEl.setAttribute('repo', 'IA-max/blog')
      scriptEl.setAttribute('issue-term', 'title')
      scriptEl.setAttribute('id', 'utterances')
      scriptEl.setAttribute('theme', 'github-light')
      scriptEl.setAttribute('crossorigin', 'anonymous')
      if (commentBox && commentBox.current) {
        commentBox.current.appendChild(scriptEl)
      } else {
        console.log(`Error adding utterances comments on: ${commentBox}`)
      }
    }, [])
    
    return ( <Layout >
        <Seo title = { markdownRemark.frontmatter.title }/>
  <article className="px-4 py-24 mx-auto">
  
  <div className="w-full mx-auto mb-12 text-left md:w-3/4 lg:w-1/2 border-b">
     {  (markdownRemark.frontmatter.featuredimage != null && markdownRemark.frontmatter.featuredimage.src != null)  ? ( < Img classNameName="object-cover w-full h-64 bg-center rounded-lg" fluid = { markdownRemark.frontmatter.featuredimage.src.childImageSharp.fluid } alt = { markdownRemark.frontmatter.featuredimage.alt }/> ) : " "   }
    
    <p className="mt-6 mb-2 text-xs font-semibold tracking-wider uppercase text-primary">
      {
            markdownRemark.frontmatter.category.map((cat, index, arr) => ( 
            <ConcatWords  arrCount = { arr.length } index = { index } key = { cat } >
                <Link className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded text-white bg-purple-700 uppercase last:mr-0 mr-1 hover:no-underline hover:text-white hover:bg-purple-400" to = { `/category/${kebabCase(cat)}` } >{ cat } </Link> 
            </ConcatWords>
            ))
        } 
      
      </p>
    <h1 className="mb-3 text-3xl font-bold leading-tight text-gray-900 md:text-4xl" title="Rise of Tailwind - A Utility First CSS Framework">
      { markdownRemark.frontmatter.title }
    </h1>
    <div className="flex mb-6 space-x-2">
      {
            markdownRemark.frontmatter.tag.map((tag, index, arr) => ( 
            < ConcatWords arrCount = { arr.length } index = { index } key = { index } >
                <Link className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded text-white bg-gray-500 uppercase last:mr-0 mr-1 hover:no-underline hover:text-white hover:bg-gray-400" to = { `/tag/${kebabCase(tag)}` } ># { tag } </Link> 
            </ConcatWords>
            ))
        } 
    </div>
    
    <Link className="flex items-center text-gray-700" to = { `/blog/author/${kebabCase(markdownRemark.frontmatter.author)}` }>
      <B/>
      <div className="ml-2">
        <p className="text-sm font-semibold text-gray-800">{ markdownRemark.frontmatter.author  }</p>
        <p className="text-sm text-gray-500">{ formatDate(markdownRemark.frontmatter.date) }</p>
      </div>
    </Link>
  </div>

  <div className="w-full mx-auto prose md:w-3/4 lg:w-1/2 articleContent" dangerouslySetInnerHTML = { { __html: markdownRemark.html } }></div>
</article>
      <div className="border-t-2 py-36 w-full mx-auto md:w-3/6 lg:w-1/2">
          <Comment commentBox={commentBox} />
      </div>


      <RecommandPost allpost={ pageContext.allPost}  category ={ markdownRemark.frontmatter.category } / >
      
  
      {/* <section className="py-20  w-full mx-auto prose md:w-3/4 lg:w-4/6">
        <div className="grid grid-cols-1 gap-24 md:grid-cols-2">
          <div>
            <h1>{ prev &&<Link to = { prev.fields.slug } className="mb-6 text-md font-semibold text-black md:text-xl">{ prev.frontmatter != null && prev.frontmatter.title }</Link> }</h1>
            <p className="mt-2 text-gray-600 text-sm text-gray-50"> { prev != null && prev.frontmatter != null &&  prev.frontmatter.excerpt }</p>
          </div>
          <div>
            <h1>{ next && ( <Link to = { next.fields.slug }  className="mb-6 text-md font-semibold text-black md:text-xl"> <div >  { next.frontmatter != null && next.frontmatter.title }  </div>  </Link>  ) }</h1>
            <p className="mt-2 text-gray-600 text-sm text-gray-50">{ next != null && next.frontmatter != null && next.frontmatter.excerpt } </p>
          </div>
        </div>
    </section> */}


        </Layout>
    )
}

export default BlogPost

export const query = graphql `
  query BlogPostBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        author
        category
        tag
        featuredimage {
              src {
                  childImageSharp {
                      fluid(maxWidth: 1024) {
                          ...GatsbyImageSharpFluid
                      }
                  }
              }
              alt
          }
      }
    }
  }
`
