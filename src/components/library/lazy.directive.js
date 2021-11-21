import tempPic from '@/assets/images/200.png'

/**
 * 图片懒加载指令
 */
export default {
  mounted (el, { value }) {
    const observer = new IntersectionObserver(([{ isIntersecting }]) => {
      if (isIntersecting) {
        observer.unobserve(el)
        const tempImg = new Image()
        el.src = tempPic
        tempImg.src = value
        tempImg.onerror = () => {
          el.src = tempPic
        }
        tempImg.onload = () => {
          el.src = value
        }
      }
    }, { threshold: 0 })
    observer.observe(el)
  }
}
