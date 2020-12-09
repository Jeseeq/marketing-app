import css from './style.css'

const HeroSection = (props) => {
  const {imageURI} = props
  return (
    <div className={css.hero}>
      <img
        alt="Hero image"
        src={imageURI}
        className={css.image}
        height="200px"
      />
    </div>
  )
}

export default HeroSection
