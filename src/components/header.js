import React from "react"
import { Link } from 'gatsby';

const pages =  [
	{
		title: 'Articles',
		url: '/articles'
	},
	{
		title: 'Resources',
		url: '/openmirrors'
	},
	{
		title: 'About',
		url: '/about'
	},
]


const Header = () => {
    return (
	<header class = "flex items-center justify-between px-4 py-4 sm:px-6 md:px-0 lg:px-0 mx-auto md:w-3/4 lg:w-2/4" >
		<div class="md:flex items-center">
		
		<Link className = "flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0 hover:no-underline" to="/">
			<svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full" viewBox="0 0 24 24">
				<path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
			</svg>
			<span class="ml-3 text-xl">IMY Blog</span>
			</Link>
		</div>

      
		<div class="flex text-sm">
			{
				pages.map((page) => {
					return (<Link className = "font-medium text-gray-500 hover:text-gray-900 ml-5 hover:no-underline hover:text-blue-700"
					to={ `${page.url}` } > { page.title } </Link> )
				})
			}
		</div>

      </header>
    )
};

export default Header;