import { useEffect, useRef } from 'react'

const BackgroundMusic = ({ isOpenModal }) => {
	const audioRef = useRef(null)

	useEffect(() => {
		const audio = audioRef.current

		if (!isOpenModal) {
			// Если модал закрыт - запускаем музыку
			audio.volume = 0.3
			audio.loop = true

			const playPromise = audio.play()

			if (playPromise !== undefined) {
				playPromise.catch(error => {
					console.error('Ошибка воспроизведения:', error)
					// Здесь можно добавить логику для обработки блокировки автозапуска
				})
			}
		} else {
			// Если модал открыт - останавливаем
			audio.pause()
			audio.currentTime = 0
		}

		// Очистка при размонтировании
		return () => {
			audio.pause()
			audio.currentTime = 0
		}
	}, [isOpenModal]) // Зависимость от пропса

	return (
		<audio ref={audioRef}>
			<source src='/happy.mp3' type='audio/mpeg' />
			Ваш браузер не поддерживает аудио
		</audio>
	)
}

export default BackgroundMusic
