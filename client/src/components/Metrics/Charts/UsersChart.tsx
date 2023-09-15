// import React, { useEffect } from 'react'
// import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
// import { Pie } from 'react-chartjs-2'
// import { getUserMetrics } from '../../../redux/actions'
// import { useDispatch, useSelector } from 'react-redux'
// import type { RootState } from '../../../redux/types'

// ChartJS.register(ArcElement, Tooltip, Legend)

// const Pies = (): JSX.Element => {
//   const dispatch = useDispatch()
//   useEffect(() => {
//     dispatch(getUserMetrics())
//   }, [dispatch])
//   const metrics = useSelector((state: RootState) => state.userMetrics)
//   console.log(metrics)

//   const options = {
//     responsive: true,
//     maintainAspectRatio: false
//   }

//   const data = {
//     labels: ['Active users', 'Inactive users'],
//     datasets: [
//       {
//         label: 'Users Analytics',
//         data: [metrics.activeUsers, metrics.inactiveUsers],
//         backgroundColor: [
//           'rgba(255, 99, 132, 0.2)',
//           'rgba(255, 206, 86, 0.2)',
//           'rgba(54, 162, 235, 0.2)',
//           'rgba(75, 192, 192, 0.2)',
//           'rgba(153, 102, 255, 0.2)'
//         ],
//         borderColor: [
//           'rgba(255, 99, 132, 1)',
//           'rgba(255, 206, 86, 1)',
//           'rgba(54, 162, 235, 1)',
//           'rgba(75, 192, 192, 1)',
//           'rgba(153, 102, 255, 1)'
//         ],
//         borderWidth: 1
//       }
//     ]
//   }

//   return (<Pie data={data} options={options} />)
// }

// export default Pies
