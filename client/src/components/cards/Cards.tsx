// components
import BusinessCard from '../BusinessCard/BusinessCard'
import Pagination from '../Pagination/Pagination'
import FilterAndOrderCard from '../FilterAndOrderCard/FilterAndOrderCard'
// interfaces
// import type { ServiceProvider } from '../../interfaces'
// css
import style from './Cards.module.css'
// props
import type { CardsProps } from '../../interfaces/props'
// hooks
import { useFilterHook, usePagination } from '../../hooks/index'
// redux
import { useSelector } from 'react-redux'
import type { RootState } from '../../redux/types'
import { useEffect, useState } from 'react'

const Cards: React.FC<CardsProps> = ({ allServices }: CardsProps) => {
  const [key, setKey] = useState(0)
  const { filteredUsers } = useFilterHook(allServices)
  const { filter } = useSelector((state: RootState) => state)
  const { itemsPaginated, currentPage, totalPages, nextPage, prevPage, startPage, finalPage } = usePagination(filteredUsers, 6, filter, key)

  const calculateRating = (reviews: any): number => {
    const totalRating = reviews.reduce((accumulator: number, current: any) => {
      return accumulator + current.review
    }, 0)

    const averageRating = totalRating / reviews.length
    return averageRating
  }

  useEffect(() => {
    setKey(key + 1)
  }, [allServices])

  return (
    <>
      <div className={style.test}>
        <div className={style['div-container-order-filter-cards']}>
        <FilterAndOrderCard allServices={allServices} />
          <section className={style.cardsSection}>
            {itemsPaginated.map(({ _id, sellerName, categoriesArray, servicesArray, reviews }: any) => {
              return <BusinessCard key={_id} _id={_id} sellerName={sellerName} rating={calculateRating(reviews)}
              categoriesArray={categoriesArray} servicesArray={servicesArray} />
            })}
          </section>
        </div>
        <Pagination currentPage={currentPage} totalPages={totalPages} nextPage={nextPage} prevPage={prevPage} startPage={startPage} finalPage={finalPage} />
      </div>
      <Pagination currentPage={currentPage} totalPages={totalPages} nextPage={nextPage} prevPage={prevPage} startPage={startPage} finalPage={finalPage} />
    </>
  )
}

export default Cards
