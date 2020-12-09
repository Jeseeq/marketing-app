export const required = (value, key, values) => {
  if (!value) {
    return `${key} is required but got ${value}`
  }
}

const sectionSchemas = {
  'image-text': {
    type: [required],
    text: [required],
  },
  hero: {
    type: [required],
    imageURI: [required],
  },
  data: {
    type: [required],
    url: [required],
  },
}

const validateSection = (sectionType, sectionValues) => {
  const sectionSchema = sectionSchemas[sectionType]
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

  return validateInner(sectionValues, sectionSchema, errors)
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
    const errors = validateSection(type, section)
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

const makeValidator = (options) => {
  return {
    parseAndValidateConfig,
  }
}

export default makeValidator
