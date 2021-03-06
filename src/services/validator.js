import sectionSchemas from './schemas'

const validateSection = (schema = {}, sectionValues) => {
  const errors = {}

  const validateInner = (values, schema, collector) => {
    for (const schemaKey of Object.keys(schema)) {
      const schemaValue = schema[schemaKey]
      if (Array.isArray(schemaValue)) {
        schemaValue.forEach(validator => {
          const result = validator(values[schemaKey], schemaKey, values)
          if (result) {
            collector[schemaKey] = result
          }
        })
      } else {
        validateInner(values[schemaKey], schema[schemaKey], collector)
      }
    }

    return collector
  }

  return validateInner(sectionValues, schema, errors)
}

const validateRoot = (config) => {
  if (Array.isArray(config)) {
    return []
  }

  return ['should be array']
}

const parseConfig = (config) => {
  try {
    return {
      value: JSON.parse(config),
      errors: [],
    }
  } catch (e) {
    return {
      value: null,
      errors: ['invalid JSON'],
    }
  }
}

const parseAndValidateConfig = (config) => {
  const {
    value,
    errors,
  } = parseConfig(config)

  if (errors.length) {
    return {
      value,
      errors,
    }
  }

  const validationErrors = validateRoot(value)

  if (validationErrors.length) {
    return {
      value,
      errors: validationErrors,
    }
  }

  const sectionErrors = value.reduce((acc, section) => {
    const {type} = section
    const schema = sectionSchemas[type]
    const errors = Object.values(validateSection(schema, section))
    if (errors.length) {
      return [...acc, ...errors]
    }

    return acc
  }, [])

  return {
    value,
    errors: sectionErrors,
  }
}

const createValidator = (options) => {
  return {
    parseAndValidateConfig,
  }
}

export default createValidator
