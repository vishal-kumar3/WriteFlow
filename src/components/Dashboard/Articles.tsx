import React from 'react'
import FlowTabSwitcher from './FlowTabSwitcher'
import PublishedArticles from './PublishedArticles'
import DraftArticles from './DraftArticles'

type props = {}

const Articles = (props: props) => {
  return (
    <>
      <FlowTabSwitcher DraftArticles={<DraftArticles />} PublishedArticles={<PublishedArticles />} />
    </>
  )
}

export default Articles
