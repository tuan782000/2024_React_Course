import PropTypes from 'prop-types'
import UserFavoriteFood from './UserFavoriteFood'
import UserUsername from './UserUsername'
const UserProfile = (props) => {
    console.log(props)
    const { age, isLoggedIn, favoriteFoods, callMe, username } = props
    // console.log(props)

    return (
        <div id="user-profile">
            <UserUsername usernam={props.username} />
            <p>Age: {age}</p>
            <div>
                <span>Email:</span>
                <span>thaituan7820@gmail.com</span>
            </div>
            <UserFavoriteFood />
            {String(isLoggedIn)}
        </div>
    )
}

UserProfile.propTypes = {

}

export default UserProfile