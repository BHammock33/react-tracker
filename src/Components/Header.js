import PropTypes from 'prop-types'
import Button from './Button'
import { useLocation } from 'react-router-dom'

const Header = ({ title, onAdd, showAdd }) => {
   const location = useLocation()

    return (
        <header className = 'header'>
            <h2>{title}</h2>
            { location.pathname === '/' && <Button 
            color={showAdd ? 'red' : 'green'} 
            text={showAdd ? 'close' : 'add'} 
            onClick = {onAdd} />}
        </header>
    );
};

//can use a variable for styling
// const headingStyle = {
//     color: 'blue', 
//     backgroundColor: 'black'
// }
Header.propTypes = {
    title : PropTypes.string,
}
Header.defaultProps = {
    title: "Task Tracker"
}
export default Header;
