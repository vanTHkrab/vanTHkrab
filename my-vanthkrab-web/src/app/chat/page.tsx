'use client'; // This directive is often needed for components using React hooks like useEffect and useState

import React, { useEffect, useState } from 'react';

// Define the message interface based on the API response
interface Message {
  id: string;
  text: string;
  sender: string;
  timestamp: string;
}

const ChatPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState<string>(''); // State for the input field

  // Fetch messages when the component mounts
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch('/api/chat');
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const data: Message[] = await response.json();
        setMessages(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
        // In a real app, you might want to set messages to a default or mock data here
        // For now, we'll use the sample message if fetching fails
        setMessages([{ id: '1', text: 'Welcome to the chat! (Sample message - API fetch failed)', sender: 'System', timestamp: new Date().toISOString() }]);
      }
    };

    fetchMessages();
  }, []); // Empty dependency array means this effect runs once on mount

  const handleSendMessage = () => {
    if (newMessage.trim() === '') return; // Don't send empty messages

    // Optimistically add the new message to the UI
    const optimisticMessage: Message = {
      id: Date.now().toString(), // Temporary ID
      text: newMessage,
      sender: 'User', // Assuming the sender is the current user
      timestamp: new Date().toISOString(),
    };
    setMessages(prevMessages => [...prevMessages, optimisticMessage]);
    setNewMessage(''); // Clear the input field

    // Clear the input field immediately after capturing its value for the optimistic update
    const currentNewMessage = newMessage;
    setNewMessage(''); 

    // Send the message to the server
    fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: currentNewMessage, sender: 'User' }), // Use captured message
    })
    .then(async response => {
      if (!response.ok) {
        // If response is not OK, try to parse error from body, then throw
        const errorData = await response.json().catch(() => null); // Try to get more info from response body
        throw new Error(errorData?.error || `Error: ${response.statusText}`);
      }
      return response.json();
    })
    .then((sentMessage: Message) => {
      // Replace optimistic message with server-confirmed message
      setMessages(prevMessages => 
        prevMessages.map(msg => 
          msg.id === optimisticMessage.id ? sentMessage : msg
        )
      );
      setError(null); // Clear any previous send errors
    })
    .catch(err => {
      console.error('Failed to send message:', err);
      // Revert optimistic update by removing the message
      setMessages(prevMessages => prevMessages.filter(msg => msg.id !== optimisticMessage.id));
      // And restore the input field content so user can retry
      setNewMessage(currentNewMessage); 
      if (err instanceof Error) {
        setError(`Failed to send message: ${err.message}. Please try again.`);
      } else {
        setError('Failed to send message. An unknown error occurred. Please try again.');
      }
    });
  };


  return (
    <div className="chat-container">
      <div className="chat-messages">
        {error && <p style={{ color: 'red' }}>Error loading messages: {error}</p>}
        {messages.length === 0 && !error && <p>No messages yet. Start the conversation!</p>}
        {messages.map((msg) => (
          <div key={msg.id} className="message">
            <strong>{msg.sender}:</strong> {msg.text} <em>({new Date(msg.timestamp).toLocaleTimeString()})</em>
          </div>
        ))}
      </div>
      <div className="chat-input-area">
        <input
          type="text"
          placeholder="Type your message..."
          className="chat-input"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
        />
        <button onClick={handleSendMessage} className="chat-send-button">
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatPage;
