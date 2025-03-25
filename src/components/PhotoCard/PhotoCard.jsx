import React, { useEffect, useRef, useState } from 'react'
import { CSSTransition } from 'react-transition-group'
import styles from './PhotoCard.module.scss'

import { Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

// import Swiper and modules styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const PhotoCard = ({ isOpen, title, imageArr }) => {
	const photoCardRef = useRef(null)

	const [photos, setPhotos] = useState([])

	useEffect(() => {
		setPhotos(imageArr)
	}, [])

	// useEffect(() => {
	// 	console.log(photos)
	// }, [photos])

	return (
		<>
			<CSSTransition
				in={!isOpen}
				appear={!isOpen}
				nodeRef={photoCardRef}
				timeout={1000}
				classNames={{
					enter: styles.photoCardEnter,
					appear: styles.photoCardEnter,
				}}
				unmountOnExit
			>
				<div ref={photoCardRef} className={styles.container}>
					<div className={styles.swiperContainer}>
						<Swiper
							modules={[Navigation, Pagination]}
							spaceBetween={10}
							slidesPerView={1}
							navigation
							pagination={{ clickable: true }}
						>
							{photos.map((photo, index) => (
								<SwiperSlide key={index}>
									<div className={styles.photoContainer}>
										<img src={photo} alt='photo' />
									</div>
								</SwiperSlide>
							))}
						</Swiper>
					</div>
					<h2>{title}</h2>
				</div>
			</CSSTransition>
		</>
	)
}

export default PhotoCard
