import './index.css';

const UserListItem = (props) => {
    const { details, onClick } = props;
    const { text } = details;
    const { name, dob } = { ...text };

    return (
        <li className="list-item" onClick={() => onClick(details)}>
            <p className="list-item-name">{name}</p>
            <p className="list-item-dob">{dob}</p>
        </li>
    );
}

export default UserListItem;
