"use client"
import React from 'react'
import ArticleForm from '@/components/ArticleForm'

export default function NewArticlePage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Nuevo artículo</h1>
      <ArticleForm mode="create" />
    </div>
  )
}
