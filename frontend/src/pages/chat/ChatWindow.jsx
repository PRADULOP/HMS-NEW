import { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import { getMessages } from '../../api';

const socket = io('/api/');

export default function ChatWindow({ role, patientId, patientName, user, appointmentUpdated }) {
  const [chat, setChat] = useState([]);
  const [text, setText] = useState('');
  const [appointments, setAppointments] = useState([]);
  const [selectedChatUser, setSelectedChatUser] = useState(null);
  const chatBoxRef = useRef(null);

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [chat]);

  useEffect(() => {
    fetchAppointments();
  }, [appointmentUpdated]);

  useEffect(() => {
    const handleReceiveMessage = (newMessage) => {
      if (
        selectedChatUser &&
        ((newMessage.doctorId === user._id && newMessage.patientId === selectedChatUser._id) ||
          (newMessage.patientId === user._id && newMessage.doctorId === selectedChatUser._id))
      ) {
        setChat((prevChat) => [...prevChat, newMessage]);
      }
    };
    socket.on('receiveMessage', handleReceiveMessage);
    return () => socket.off('receiveMessage', handleReceiveMessage);
  }, [selectedChatUser, user]);

  useEffect(() => {
    if (selectedChatUser) fetchChat();
  }, [selectedChatUser]);

  const fetchAppointments = async () => {
    try {
      const endpoint = role === 'doctor'
        ? `/api/apis/appointments/doctor/${user._id}`
        : `/api/apis/appointments/get/${patientId}`;
      const res = await axios.get(endpoint);
      setAppointments(res.data);
    } catch (err) {
      console.error('Error fetching appointments:', err);
    }
  };

  const fetchChat = async () => {
    try {
      const { data } = await getMessages(
        role === 'doctor' ? user._id : selectedChatUser._id,
        role === 'doctor' ? selectedChatUser._id : user._id
      );
      setChat(data);
    } catch (err) {
      console.error('Error fetching chat:', err);
    }
  };

  const handleSend = async () => {
    if (!selectedChatUser || !text.trim()) return;
    const doctorId = role === 'doctor' ? user._id : selectedChatUser._id;
    const patientIdToSend = role === 'doctor' ? selectedChatUser._id : user._id;
    const doctorName = role === 'doctor' ? user.name : selectedChatUser.name;
    const patientNameToSend = role === 'doctor' ? selectedChatUser.name : user.name;

    const messageData = {
      doctorName,
      patientName: patientNameToSend,
      message: text,
      senderRole: role,
      doctorId,
      patientId: patientIdToSend,
    };

    try {
      const response = await axios.post('/api/apis/chat/send', messageData);
      setText('');
      setChat((prevChat) => [...prevChat, response.data]);
      socket.emit('sendMessage', response.data);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="mt-4">
      <h2 className="text-xl font-semibold mb-2">Chat Section</h2>

      <select
        className="w-full p-2 border rounded mb-4"
        value={selectedChatUser?._id || ''}
        onChange={(e) => {
          const selectedUserId = e.target.value;
          const selectedAppointment = appointments.find((apt) =>
            role === 'doctor'
              ? apt.patientId?._id === selectedUserId
              : apt.doctorId?._id === selectedUserId
          );
          const userObj = role === 'doctor' ? selectedAppointment?.patientId : selectedAppointment?.doctorId;
          setSelectedChatUser(userObj);
          setChat([]); // Clear chat when selecting new user
        }}
      >
        <option value="" disabled>Select {role === 'doctor' ? 'Patient' : 'Doctor'} to Chat</option>
        {appointments.map((apt) => {
          const userObj = role === 'doctor' ? apt.patientId : apt.doctorId;
          return (
            <option key={apt._id} value={userObj?._id}>{userObj?.name}</option>
          );
        })}
      </select>

      <div 
        ref={chatBoxRef}
        className="border rounded-lg p-4 my-2 h-[300px] overflow-y-auto shadow-md"
      >
        {selectedChatUser ? (
          chat.length === 0 ? (
            <p className="text-gray-500">No messages yet.</p>
          ) : (
            chat.map((msg, index) => (
              <div 
                key={index} 
                className={`flex ${msg.senderRole === role ? 'justify-end' : 'justify-start'} mb-2`}
              >
                <div 
                  className={`
                    max-w-[60%] 
                    break-words 
                    px-3 
                    py-2 
                    rounded-xl 
                    ${msg.senderRole === role 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-200 text-black'}
                  `}
                >
                  {msg.message}
                </div>
              </div>
            ))
          )
        ) : (
          <p className="text-gray-500">Select a user to view chat</p>
        )}
      </div>

      <input
        type="text"
        placeholder="Type your message"
        className="w-full p-2 border rounded"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        disabled={!selectedChatUser}
      />
      <button 
        onClick={handleSend} 
        className="mt-2 w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:bg-cyan-500"
        disabled={!selectedChatUser}
      >
        Send
      </button>
    </div>
  );
}

