import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
// import { connect } from 'react-redux'
import { increaseCounter, decreaseCounter, fetchAllGroups } from '../../Action/actions'
const Home = (props) =>
{
	const newCount = useSelector(
		(state) =>
		{
			return state.counter.count
		}
	)
	const listGroup_test = useSelector(
		(state) =>
		{
			return state.group.listGroup
		}
	)
	console.log("check listGroup_test", listGroup_test);
	const dispatch = useDispatch()
	// event handler
	const handleIncrease = () =>
	{
		// dispatch action
		// props.increaseCounter()
		dispatch(increaseCounter())
	}
	const handleDecrease = () =>
	{
		// props.decreaseCounter()
		dispatch(decreaseCounter())
	}
	useEffect(() =>
	{
		dispatch(fetchAllGroups())
	}, [dispatch])
	return (
		<>
			<div>Home</div>
			<div> Count : {newCount}</div>
			<button className="btn btn-danger" onClick={() => handleIncrease()}> increaseCounter</button>
			<button className="btn btn-success" onClick={() => handleDecrease()}> increaseCounter</button>
		</>
	)
}
// const mapStateToProps = state =>
// {
// 	return {
// 		count: state.counter.count,
// 	}
// }
// const mapDispatchToProps = dispatch =>
// {
// 	return {
// 		increaseCounter: () => dispatch(increaseCounter()),
// 		decreaseCounter: () => dispatch(decreaseCounter()),
// 	}
// }
// export default connect(mapStateToProps, mapDispatchToProps)(Home)
export default Home