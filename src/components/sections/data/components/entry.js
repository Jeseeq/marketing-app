import css from './style.css'

const Entry = (props) => {
  const {entry} = props
  const {API, Description, Link} = entry
  return (
    <div className={css.entry}>
      <strong>{API}</strong>
      <p>{Description}</p>
      <a href={Link}>{Link}</a>
    </div>
  )
}

export default Entry
