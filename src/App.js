import './App.css';
import contacts from './contacts.json'
import { useState } from 'react';

export default function App() {
  const [contactsList, setContactsList] = useState(contacts.slice(0, 5))

  const addContact = () => {
    if (contactsList.length === contacts.length) return;
    const randomContact = contacts[Math.floor(Math.random() * contacts.length)];
    const contactMap = contactsList.map(elem => elem.id);
    contactMap.includes(randomContact.id) ? addContact() : setContactsList([randomContact, ...contactsList]);
  }

  const sortContacts = (sortingBy) => {
    console.log("sorting");
    const contactsListCopy = JSON.parse(JSON.stringify(contactsList));
    if (sortingBy === "name") {
      setContactsList(contactsListCopy.sort((a, b) => a.name > b.name ? 1 : -1));
    } else {
      setContactsList(contactsListCopy.sort((a, b) => a.popularity < b.popularity ? 1 : -1));
    }
  }

  const removeContact = (removeId) => {
    setContactsList(contactsList.filter(elem => elem.id !== removeId))
  }

  return (<div className="App">
    <h1>IRON CONTACTS</h1>
    <div className="buttons">
      <button className='btn greenBtn' onClick={addContact}>ADD RANDOM CONTACT</button>
      <button className='btn greenBtn' onClick={() => sortContacts("name")}>SORT CONTACTS BY NAME</button>
      <button className='btn greenBtn' onClick={() => sortContacts("popularity")}>SORT CONTACTS BY POPULARITY</button>
    </div>

    <table>
      <thead>
        <tr>
          <th>Picture</th>
          <th>Name</th>
          <th>Popularity</th>
          <th>Oscar</th>
          <th>Emmy</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {
          contactsList.map((elem) => {
            return (
              <tr key={elem.id}>
                <td className='pictureContact'><img src={elem.pictureUrl} alt="" height="300px" className='pictureContact' /></td>
                <td>{elem.name}</td>
                <td>{elem.popularity}</td>
                <td>{elem.wonOscar ? <img src="oscar.png" alt="" height="150px" /> : ""}</td>
                <td>{elem.wonEmmy ? <img src="emmy.png" alt="" height="150px" /> : ""}</td>
                <td><button className='btn redBtn' onClick={() => removeContact(elem.id)}>REMOVE</button></td>
              </tr>
            )
          })
        }
      </tbody>
    </table>
  </div>);
}
