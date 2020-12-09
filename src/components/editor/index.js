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
    <textarea
      style={{width: 600, height: 600}}
      value={config}
      onChange={onEditorChange}
    />
  )
}

export default Editor
