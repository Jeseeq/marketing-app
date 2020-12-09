import {useLoadData} from './use-load-data'
import Entry from './components/entry'
import css from './style.css'

const DataSection = (props) => {
  const {url} = props
  const {
    loading,
    error,
    data,
    refetch,
  } = useLoadData({url})

  if (error) {
    return (
      <div>
        Cant load data
      </div>
    )
  }
  if (loading) {
    return (
      <div>
        Loading
      </div>
    )
  }

  const handleRefetch = async (event) => {
    event.preventDefault()
    await refetch()
  }

  const {entries} = data

  return (
    <div className={css.wrapper}>
      <div className={css.refetch}>
        <button onClick={handleRefetch}>
          Refetch
        </button>
      </div>
      <div className={css.entries}>
        {entries.slice(0, 5).map((entry, index) => {
          return (
            <Entry entry={entry} key={index} />
          )
        })}
      </div>

    </div>
  )
}

export default DataSection
