import React from 'react'
import { Link } from 'react-router-dom'

export default function Logo({Url, StyleLink, StyleSpan}) {
  return (
    <Link to={Url} className={StyleLink}>
        <span className={StyleSpan}>SelfStudy</span>
        BLOG
    </Link>
  )
}
