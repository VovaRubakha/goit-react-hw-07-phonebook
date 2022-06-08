import PropTypes from 'prop-types';

import styles from './contactList.module.css'

const ContactList = ({ contacts, deleteContact }) => {
    return (
        <ul className={styles.list}>
            {contacts.map(({id, name, phone}) => (
                <li key={id} className={styles.item}>
                    {`${name} ${phone}`}
                    <button onClick={() => deleteContact(id)} className={styles.button}>Delete</button>
                </li>
            ))}
        </ul>
    )
}

export default ContactList;

ContactList.propTypes = {
    contacts: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            phone: PropTypes.string.isRequired,
        }).isRequired,
    ),
    deleteContact: PropTypes.func.isRequired,
};