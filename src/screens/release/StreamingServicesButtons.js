// import React from 'react'
// import styled from '@emotion/styled'
// import { Button } from 'components'

// const Buttons = styled.div`
//   margin-bottom: calc(var(--vertical-2) - var(--horizontal-6));

//   & > p {
//     margin-bottom: var(--vertical-6);
//     color: var(--secondary-text);
//   }
// `

// const Services = styled.div`
//   margin: calc(var(--horizontal-6) * -1);
// `

// const Btn = styled(Button)`
//   margin: var(--horizontal-6);

//   &.amediateka {
//     background-color: var(--amediateka);
//   }

//   &.ivi {
//     background-color: var(--ivi);
//   }

//   &.kinopoisk-hd {
//     background-color: var(--kinopoisk-hd);
//   }

//   &.netflix {
//     background-color: var(--netflix);
//   }

//   &.okko {
//     background-color: var(--okko);
//   }

//   & > img {
//     height: 24px;
//   }
// `

// function StreamingServicesButtons({ type }) {
//   if (type === 'games') return null

//   return (
//     <Buttons>
//       <p>Где смотреть:</p>
//       <Services>
//         <Btn className="amediateka">
//           <img
//             src="/icons/streaming-services/amediateka.svg"
//             alt="Amediateka"
//           />
//         </Btn>
//         <Btn className="ivi">
//           <img src="/icons/streaming-services/ivi.svg" alt="Ivi" />
//         </Btn>
//         <Btn className="kinopoisk-hd">
//           <img
//             src="/icons/streaming-services/kinopoisk-hd.svg"
//             alt="Kinopoisk HD"
//           />
//         </Btn>
//         <Btn className="netflix">
//           <img src="/icons/streaming-services/netflix.svg" alt="Netflix" />
//         </Btn>
//         <Btn className="okko">
//           <img src="/icons/streaming-services/okko.svg" alt="Okko" />
//         </Btn>
//       </Services>
//     </Buttons>
//   )
// }

// export default StreamingServicesButtons
