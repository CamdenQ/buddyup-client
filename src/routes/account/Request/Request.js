import React, { useState, useEffect } from 'react'
import { FaCheck, FaQuestion } from 'react-icons/fa'
import config from '../../../config'
import TokenService from '../../../services/token-service'
// import './Request.css'

export default function Request({
	user_name,
	activity_id,
	contact_info,
	is_approved,
}) {
	const [toggle, handleToggle] = useState(false)
	const [activity, setActivity] = useState({})
	const [user, setUser] = useState({})
	const [error, setError] = useState('')

	let {
		title,
		description,
		zip_code,
		start_time,
		end_time,
	} = activity

	let { name } = user

	const faString = is_approved
		? () => {
				return <FaCheck className='' />
		  }
		: () => {
				return <FaQuestion className='' />
		  }

	const statusString = is_approved ? 'Approved!' : 'Pending...'

	useEffect(() => {
		const getActivity = async () => {
			try {
				const activityResponse = await fetch(
					`${config.API_ENDPOINT}/activities/${activity_id}`,
					{
						method: 'GET',
						headers: {
							'content-type': 'application/json',
							authorization: `Bearer ${TokenService.getAuthToken()}`,
						},
					}
				)
				const activity = await activityResponse.json()
				if (activity.error) throw activity.error
				setActivity(activity)

				const { user_id } = activity

				const userResponse = await fetch(
					`${config.API_ENDPOINT}/users/${user_id}`,
					{
						method: 'GET',
						headers: {
							'content-type': 'application/json',
							authorization: `Bearer ${TokenService.getAuthToken()}`,
						},
					}
				)
				const user = await userResponse.json()
				if (user.error) throw user.error
				setUser(user)
			} catch (error) {
				setError(error)
			}
		}
		!error && getActivity()
		return () => {}
	}, [activity_id, error])

	return (
		<>
			<div>
				<li onClick={() => handleToggle((prev) => !prev)}>
					{title} {name} {statusString} {faString()}
				</li>
			</div>
			{toggle && (
				<div className='account__modal'>
					<div
						className='expanded__activity'
						onClick={() => handleToggle((prev) => !prev)}
					>
						{title}
					</div>
				</div>
			)}
		</>
	)
}
