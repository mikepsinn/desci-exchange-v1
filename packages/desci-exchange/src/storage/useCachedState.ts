import React, { useState, useEffect } from 'react'
import local from './local'

const useCachedState = (key: string): [any | undefined, React.Dispatch<React.SetStateAction<any>>] => {
  const [cache, setCache] = useState<any>()

  useEffect(() => {
    const saved = local.getItem<any>(key)
    setCache(saved)
  }, [key, setCache])

  useEffect(() => {
    local.setItem<any | undefined>(key, cache)
  }, [key, cache])

  return [cache, setCache]
}

export default useCachedState
