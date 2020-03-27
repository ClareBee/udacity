import React from 'react';
import './App.css';

function ContactList({ contacts}) {

    return( <ol>
        {contacts.map((person) => (
          <li key={person.name}>{person.name}</li>
        ))}
      </ol>)
}
function App() {
  return (
    <div className="App">
      <ContactList contacts={[
        { name: 'Tyler ' },
        { name: 'Karen' },
        { name: 'Richard ' }
      ]}/>
      <ContactList contacts={[
        { name: 'Amanda' },
        { name: 'Mikenzi' },
        { name: 'Ryan' }
      ]} />
    </div>
  );
}

export default App;
