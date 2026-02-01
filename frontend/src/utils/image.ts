/**
 * 图片优化工具函数
 * 提供图片加载优化、懒加载、响应式图片等功能
 */

/**
 * 预加载图片
 */
export function preloadImage(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve()
    img.onerror = reject
    img.src = src
  })
}

/**
 * 批量预加载图片
 */
export async function preloadImages(sources: string[]): Promise<void> {
  await Promise.all(sources.map(src => preloadImage(src)))
}

/**
 * 图片懒加载指令
 */
export const lazyLoadDirective = {
  mounted(el: HTMLImageElement, binding: { value: string }) {
    // 使用 Intersection Observer 实现懒加载
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement
            img.src = binding.value
            img.removeAttribute('data-src')
            observer.unobserve(img)
          }
        })
      })
      observer.observe(el)
      ;(el as any)._lazyObserver = observer
    } else {
      // 回退方案：立即加载
      el.src = binding.value
    }
  },
  unmounted(el: HTMLImageElement) {
    const observer = (el as any)._lazyObserver
    if (observer) {
      observer.disconnect()
    }
  }
}

/**
 * 生成响应式图片 URL
 */
export function getResponsiveImageUrl(
  originalUrl: string,
  width: number
): string {
  // 支持 Unsplash 等图片服务
  if (originalUrl.includes('images.unsplash.com')) {
    const url = new URL(originalUrl)
    url.searchParams.set('w', width.toString())
    url.searchParams.set('q', '80')
    url.searchParams.set('auto', 'format')
    return url.toString()
  }
  
  // 其他图片服务保持原样
  return originalUrl
}

/**
 * 生成图片 srcset
 */
export function generateSrcSet(
  baseUrl: string,
  widths: number[] = [320, 640, 768, 1024, 1280]
): string {
  return widths
    .map(w => `${getResponsiveImageUrl(baseUrl, w)} ${w}w`)
    .join(', ')
}

/**
 * 图片占位符
 */
export function getPlaceholder(size: number = 400): string {
  return `data:image/svg+xml,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size * 0.6}">
      <rect fill="#f1f5f9" width="${size}" height="${size * 0.6}"/>
      <text x="50%" y="50%" text-anchor="middle" fill="#94a3b8" font-family="sans-serif" font-size="14">
        Loading...
      </text>
    </svg>
  `)}`
}

/**
 * 检查图片是否在视口内
 */
export function isInViewport(el: HTMLElement): boolean {
  const rect = el.getBoundingClientRect()
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  )
}

/**
 * 渐进式加载图片（先加载小图，再加载大图）
 */
export async function progressiveLoad(
  smallUrl: string,
  largeUrl: string,
  imgElement: HTMLImageElement
): Promise<void> {
  // 先加载小图
  imgElement.src = smallUrl
  await preloadImage(smallUrl)
  
  // 预加载大图
  preloadImage(largeUrl).then(() => {
    // 大图加载完成后替换
    const largeImg = new Image()
    largeImg.onload = () => {
      imgElement.src = largeUrl
    }
    largeImg.src = largeUrl
  })
}

/**
 * 缓存已加载的图片
 */
const imageCache = new Set<string>()

export function isImageCached(url: string): boolean {
  return imageCache.has(url)
}

export function markImageAsCached(url: string): void {
  imageCache.add(url)
}

/**
 * 安全的图片加载（带错误处理）
 */
export async function safeLoadImage(
  url: string,
  fallbackUrl?: string
): Promise<string> {
  try {
    await preloadImage(url)
    markImageAsCached(url)
    return url
  } catch {
    if (fallbackUrl) {
      try {
        await preloadImage(fallbackUrl)
        markImageAsCached(fallbackUrl)
        return fallbackUrl
      } catch {
        throw new Error('Failed to load image')
      }
    }
    throw new Error('Failed to load image')
  }
}
