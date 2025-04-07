import { FC } from 'react'
import { LoadingFullScreen } from './Loading'
import NoData from './NoData'

type LoadingOrEmptyFlatListProps = {
  isLoading: boolean
  data?: any[]
  loadingText?: string
  emptyText?: string
}
const LoadingOrEmptyFlatList: FC<LoadingOrEmptyFlatListProps> = ({ isLoading, data, loadingText, emptyText }) => {
  return !data || isLoading ? <LoadingFullScreen text={loadingText} /> : <NoData text={emptyText} />
}

export default LoadingOrEmptyFlatList
