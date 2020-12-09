import {useState, useMemo, useCallback} from 'react'
import Editor from '../editor'
import Canvas from '../canvas'
import createValidator from '../../services/validator'
import initialValue from './initial'
import css from './style.css'

const App = () => {
  const validator = useMemo(() => {
    return createValidator({})
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
