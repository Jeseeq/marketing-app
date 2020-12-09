const required = (value, key) => {
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
  default: {
    type: [required],
  },
}

export default sectionSchemas
