import {
  Image,
  Hero,
  Data,
} from '../sections'
import css from './style.css'

const sectionComponents = {
  hero: Hero,
  data: Data,
  'image-text': Image,
}

const renderWebsiteMarkup = (config) => {
  return config.map((section, index) => {
    const {type} = section
    const Component = sectionComponents[type]
    const key = `${type}-${index}`
    return (
      <div className={css.sectionWrapper} key={key}>
        <Component {...section} />
      </div>
    )
  })
}

const Canvas = (props) => {
  const {
    config,
    errors,
  } = props

  if (errors.length) {
    return (
      <div className={css.canvas}>
        Errors {JSON.stringify(errors, null, 2)}
      </div>
    )
  }

  const markup = renderWebsiteMarkup(config)

  return (
    <div className={css.canvas}>{markup}</div>
  )
}

export default Canvas
