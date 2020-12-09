import {useState, useMemo, useCallback} from 'react'
import makeValidator from '../services/validator'
import Editor from './editor'
import Canvas from './canvas'
import css from './style.css'

const initialValue = [{
  type: 'hero',
  imageURI: 'https://images.unsplash.com/photo-1579963333765-b4129b3250fc',
}, {
  type: 'image-text',
  imageURI: 'https://images.unsplash.com/photo-1579963333765-b4129b3250fc',
  text: 'Sunset from the sky......',
  title: 'Airplane',
  leftToRight: false,
}, {
  type: 'image-text',
  imageURI: 'https://images.unsplash.com/photo-1579963333765-b4129b3250fc',
  text: 'Sunset from the sky......',
  title: 'Airplane',
  leftToRight: true,
}, {
  type: 'data',
}]

const App = () => {
  const validator = useMemo(() => {
    return makeValidator({})
  }, [])

  const [config, setConfig] = useState(JSON.stringify(initialValue, null, 2))

  const handleChangeConfig = useCallback((config) => {
    setConfig(config)
  }, [])

  const {
    errors,
    value: parsedConfig,
  } = validator.parseAndValidateConfig(config)

  return (
    <div className={css.app}>
      <Editor
        config={config}
        onChange={handleChangeConfig}
      />
      <Canvas
        config={parsedConfig}
        errors={errors}
      />
    </div>
  )
}

export default App
