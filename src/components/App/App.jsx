import { useEffect, useState } from 'react'
import ReactConfetti from 'react-confetti'
import { useWindowSize } from 'react-use'
import BackgroundMusic from '../BackgroundMusic/BackgroundMusic'
import PhotoCard from '../PhotoCard/PhotoCard'
import styles from './App.module.scss'

function App() {
	const { width, height } = useWindowSize()
	const [isOpenModal, setIsOpenModal] = useState(true)
	const [data, setData] = useState([])

	useEffect(() => {
		fetch('/birthday_app/data.json')
			.then(res => res.json())
			.then(setData)
			.catch(err => console.log(err))
	}, [])

	return (
		<>
			<BackgroundMusic isOpenModal={isOpenModal} />
			<div
				style={isOpenModal ? { display: 'block' } : { display: 'none' }}
				onClick={() => setIsOpenModal(false)}
				className={styles.imgBackground}
			>
				<img
					style={isOpenModal ? { display: 'block' } : { display: 'none' }}
					className={styles.imgBackground}
					src='/birthday_app/popupBackground_1.jpg'
					alt='/'
					onClick={() => setIsOpenModal(false)}
				/>
				<h1 className={styles.title}>C ДНЕМ РОЖДЕНИЯ!!!</h1>
				<img
					className={styles.imgFace}
					src='/birthday_app/popupPhoto.jpg'
					alt='photo'
				/>
			</div>
			<main
				style={isOpenModal ? { display: 'none' } : { display: 'flex' }}
				className={styles.main}
			>
				{data.map((item, index) => (
					<PhotoCard
						isOpen={isOpenModal}
						title={item.title}
						imageArr={item.photos}
						key={index}
					/>
				))}
			</main>
			<ReactConfetti
				width={width}
				height={height}
				numberOfPieces={50}
				gravity={0.1}
			/>
		</>
	)
}

export default App
