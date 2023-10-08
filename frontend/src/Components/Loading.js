import React from 'react'
import './Loading.css'

const Loading = () => {
  return (
    <div className='min-h-screen flexCenter flex-col'>

    <div className="book ">
	<div className="book__pg-shadow"></div>
	<div className="book__pg"></div>
	<div className="book__pg book__pg--2"></div>
	<div className="book__pg book__pg--3"></div>
	<div className="book__pg book__pg--4"></div>
	<div className="book__pg book__pg--5"></div>
</div>
<div>Loading...</div>
    </div>
  )
}

export default Loading