import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const TicketManagementSystem = () => {
    const [ticketTypes, setTicketTypes] = useState([]);
    const [newTicketType, setNewTicketType] = useState('');
    const [newTicketDescription, setNewTicketDescription] = useState('');
    const [editTicketIndex, setEditTicketIndex] = useState(null);
    const [editTicketType, setEditTicketType] = useState('');
    const [editTicketDescription, setEditTicketDescription] = useState('');

    const handleAddTicket = () => {
        if (newTicketType.trim() === '') {
            alert('Ticket type is required!');
            return;
        }

        const newTicket = {
            type: newTicketType,
            description: newTicketDescription,
        };

        setTicketTypes([...ticketTypes, newTicket]);
        setNewTicketType('');
        setNewTicketDescription('');
    };

    const handleEditTicket = (index) => {
        const ticket = ticketTypes[index];
        setEditTicketIndex(index);
        setEditTicketType(ticket.type);
        setEditTicketDescription(ticket.description);
    };

    const handleSaveEdit = () => {
        if (editTicketType.trim() === '') {
            alert('Ticket type is required!');
            return;
        }

        const updatedTicketTypes = [...ticketTypes];
        updatedTicketTypes[editTicketIndex] = {
            type: editTicketType,
            description: editTicketDescription,
        };

        setTicketTypes(updatedTicketTypes);
        setEditTicketIndex(null);
        setEditTicketType('');
        setEditTicketDescription('');
    };

    const handleDeleteTicket = (index) => {
        const confirmation = window.confirm('Are you sure you want to delete this ticket type?');
        if (confirmation) {
            const updatedTicketTypes = [...ticketTypes];
            updatedTicketTypes.splice(index, 1);
            setTicketTypes(updatedTicketTypes);
        }
    };

    return (
        <div className="container" style={{ backgroundColor: '#B8F2C0', padding: '20px' }}>
            <h1 className="mt-4">Ticket Management System</h1>

            {/* Add Ticket */}
            <div className="mb-4">
                <div className="row">
                    <div className="col-md-4">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Ticket Type"
                            value={newTicketType}
                            onChange={(e) => setNewTicketType(e.target.value)}
                        />
                    </div>
                    <div className="col-md-4">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Description"
                            value={newTicketDescription}
                            onChange={(e) => setNewTicketDescription(e.target.value)}
                        />
                    </div>
                    <div className="col-md-4">
                        <button className="btn btn-primary" onClick={handleAddTicket}>
                            Add Ticket
                        </button>
                    </div>
                </div>
            </div>

            {/* Ticket Types Table */}
            <table className="table">
                <thead>
                    <tr>
                        <th>Ticket Type</th>
                        <th>Description</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {ticketTypes.map((ticket, index) => (
                        <tr key={index}>
                            {editTicketIndex === index ? (
                                <>
                                    <td>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={editTicketType}
                                            onChange={(e) => setEditTicketType(e.target.value)}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={editTicketDescription}
                                            onChange={(e) => setEditTicketDescription(e.target.value)}
                                        />
                                    </td>
                                    <td>
                                        <button className="btn btn-success" onClick={handleSaveEdit}>
                                            Save
                                        </button>
                                    </td>
                                    <td>
                                        <button
                                            className="btn btn-danger"
                                            onClick={() => handleDeleteTicket(index)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </>
                            ) : (
                                <>
                                    <td>{ticket.type}</td>
                                    <td>{ticket.description}</td>
                                    <td>
                                        <button
                                            className="btn btn-primary"
                                            onClick={() => handleEditTicket(index)}
                                        >
                                            Edit
                                        </button>
                                    </td>
                                    <td>
                                        <button
                                            className="btn btn-danger"
                                            onClick={() => handleDeleteTicket(index)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TicketManagementSystem;
