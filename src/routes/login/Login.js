import React, { useState } from 'react'
import './Login.css'
import Input from '../../components/form/Input'
import { Link, useRouteMatch } from 'react-router-dom'
import useForm from '../../hooks/useForm'
import SubmitButton from '../../components/form/SubmitButton'

export default function Login() {
	const [error, setError] = useState(null)

	const { values, handleChange, reset } = useForm({
		username: '',
		password: '',
		password_2: '',
	})

	const handleSubmit = (e) => {
		e.preventDefault()
		const { username, password, password_2 } = values
		if (password !== password_2) {
			setError('Passwords do not match')
		} else if (password.split().join() === ' ') {
			setError('Passwords cannot be blank')
		} else {
			console.log(values)
			reset()
		}
	}
	return (
		<>
			<header className='header'>
				<h1>
					<Link to='/'>BuddyUp</Link>
				</h1>
				<p>
					Welcome back to BuddyUp! Log in to find your next
					buddy!
				</p>
			</header>
			<div className='login__container'>
				<form className='login__form' onSubmit={handleSubmit}>
					<div className='input__container'>
						{error && (
							<div className='error__'>{error}</div>
						)}
						<Input
							aria-label='Username'
							name='username'
							placeholder='Username'
							onChange={handleChange}
							value={values.username}
							required
						/>
						<Input
							aria-label='Password'
							name='password'
							placeholder='Password'
							onChange={(e) => {
								handleChange(e)
								setError(null)
							}}
							value={values.password}
							required
						/>
						{values.password && (
							<Input
								aria-label='Confirm Password'
								placeholder='Confirm Password'
								name='password_2'
								value={values.password_2}
								onChange={(e) => {
									handleChange(e)
									setError(null)
								}}
								required
							/>
						)}
					</div>

					<SubmitButton arial-label='Login' text='LOGIN' />
				</form>
			</div>
		</>
	)
}
