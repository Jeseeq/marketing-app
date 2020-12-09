import css from './style.css'

const Editor = (props) => {
  const {
    config,
    onChange,
  } = props

  const onEditorChange = (event) => {
    const {value} = event.target
    onChange(value)
  }

  return (
    <div className={css.editor}>
      <textarea
        style={{width: 600, height: 600}}
        value={config}
        onChange={onEditorChange}
      />
    </div>
  )
}

export default Editor
