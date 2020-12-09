import Image from '../sections/image-text'
import Hero from '../sections/hero'
import Data from '../sections/data'

const sectionComponents = {
  hero: Hero,
  data: Data,
  'image-text': Image,
}

const renderWebsiteMarkup = (config) => {
  return config.map(section => {
    const {type} = section
    const Component = sectionComponents[type]
    return (
      <Component {...section} />
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
      <div>
        Errors {JSON.stringify(errors, null, 2)}
      </div>
    )
  }

  const markup = renderWebsiteMarkup(config)

  return (
    <div>{markup}</div>
  )
}

export default Canvas
