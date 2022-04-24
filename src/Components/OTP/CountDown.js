import React, { useState, useEffect } from 'react'

export default function CountDown (props) 
{
	const [count, setCount] = useState(10);

	useEffect(() =>
	{
		if (count === 0)
		{
			props.setIsDisabledBtn(true);
			return;
		}
		const times = setInterval(() =>
		{
			setCount(count - 1);
		}, 1000);
		return () =>
		{
			clearInterval(times)
		}
	}, [count, props])
	return (
		<div>
			{count}
		</div>
	)
}
