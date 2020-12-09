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
      <div>
        <h3 className={css.title}>{title}</h3>
        <p className={css.content}>{text}</p>
      </div>
    </div>
  )
}

export default ImageSection
