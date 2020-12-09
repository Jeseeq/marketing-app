import classNames from 'classnames'
import css from './style.css'

const ImageSection = (props) => {
  const {imageURI, text, title, leftToRight = true} = props
  return (
    <div className={classNames(css.wrapper, {[css.reverse]: leftToRight})}>
      <img
        alt="Hero image"
        src={imageURI}
        className={css.image}
        height="200px"
      />
      <div className={css.content}>
        <h3>{title}</h3>
        <p>{text}</p>
      </div>
    </div>
  )
}

export default ImageSection
