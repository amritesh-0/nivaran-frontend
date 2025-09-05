import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Loader, Camera, MapPin } from 'lucide-react';
import chatbotApi from '../../services/chatbotApi';
import { useAuth } from '../../context/AuthContext';

// Welcome message for the chatbot
const WELCOME_MESSAGE = `Hi! I'm your Nivaran Assistant. I can help you with:

• Checking ticket status (e.g., 'CIT-2024-1234')
• Creating new tickets
• Understanding DigiPin codes
• General platform questions

What would you like to know?`;

const Chatbot = () => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: WELCOME_MESSAGE,
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [videoStream, setVideoStream] = useState(null);
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const videoRef = useRef(null);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      videoRef.current.srcObject = stream;
      setVideoStream(stream);
      setIsCameraOpen(true);
    } catch (error) {
      console.error('Error accessing camera:', error);
      setMessages(prev => [...prev, {
        id: prev.length + 1,
        text: 'Unable to access camera. Please check your permissions.',
        sender: 'bot',
        timestamp: new Date()
      }]);
    }
  };

  const capturePhoto = () => {
    if (!videoRef.current) return;
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    const imageDataUrl = canvas.toDataURL('image/jpeg');

    // Stop video stream
    videoStream.getTracks().forEach(track => track.stop());
    setIsCameraOpen(false);

    // Send image data as message
    setMessages(prev => [...prev, {
      id: prev.length + 1,
      text: '[Image attached]',
      sender: 'user',
      timestamp: new Date(),
      image: imageDataUrl
    }]);

    // Optionally, send image to backend or handle upload here
  };

  const getCurrentLocation = () => {
    setIsGettingLocation(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const digipinCode = `DIG-${Math.floor(latitude * 1000)}-${Math.floor(longitude * 1000)}`;
          const locationText = `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`;

          // Send location data as message
          setMessages(prev => [...prev, {
            id: prev.length + 1,
            text: `[Location shared: ${locationText}]\nDigiPin Code: ${digipinCode}`,
            sender: 'user',
            timestamp: new Date(),
            location: { latitude, longitude, digipinCode }
          }]);

          setIsGettingLocation(false);
        },
        (error) => {
          console.error('Error getting location:', error);
          setMessages(prev => [...prev, {
            id: prev.length + 1,
            text: 'Unable to get location. Please enable location services.',
            sender: 'bot',
            timestamp: new Date()
          }]);
          setIsGettingLocation(false);
        }
      );
    } else {
      setMessages(prev => [...prev, {
        id: prev.length + 1,
        text: 'Geolocation is not supported by this browser.',
        sender: 'bot',
        timestamp: new Date()
      }]);
      setIsGettingLocation(false);
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage = {
      id: messages.length + 1,
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const data = await chatbotApi.sendQuery(inputValue, user?.id);

      // Handle authentication required response
      if (data.requiresAuth) {
        const authMessage = {
          id: messages.length + 2,
          text: data.response,
          sender: 'bot',
          timestamp: new Date(),
          isAuthPrompt: true
        };
        setMessages(prev => [...prev, authMessage]);
      } else {
        const botMessage = {
          id: messages.length + 2,
          text: data.response || 'Sorry, I couldn\'t process your request.',
          sender: 'bot',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, botMessage]);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage = {
        id: messages.length + 2,
        text: 'Sorry, I\'m having trouble connecting. Please try again later.',
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chatbot Icon */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="fixed bottom-6 right-6 z-50"
      >
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpen(!isOpen)}
          className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white p-4 rounded-full shadow-lg transition-all duration-300"
        >
          <MessageCircle className="w-6 h-6" />
        </motion.button>
      </motion.div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 w-96 h-[500px] bg-white rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                  <MessageCircle className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-semibold">Nivaran Assistant</h3>
                  <p className="text-xs opacity-90">Online</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="hover:bg-white hover:bg-opacity-20 rounded-full p-1 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl ${
                      message.sender === 'user'
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    <div className="text-sm whitespace-pre-line">{message.text}</div>
                    <p className={`text-xs mt-1 ${
                      message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                    }`}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                    {message.image && (
                      <img src={message.image} alt="User upload" className="mt-2 rounded-lg max-w-full" />
                    )}
                    {message.location && (
                      <div className="mt-2 p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <MapPin className="w-4 h-4" />
                          <span>Location shared</span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          DigiPin: {message.location.digipinCode}
                        </p>
                      </div>
                    )}
                    {message.isAuthPrompt && (
                      <div className="mt-2">
                        <button
                          onClick={() => {
                            setIsOpen(false);
                            window.location.href = '/auth';
                          }}
                          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                        >
                          Login Now
                        </button>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="bg-gray-100 p-3 rounded-2xl">
                    <div className="flex items-center space-x-2">
                      <Loader className="w-4 h-4 animate-spin" />
                      <span className="text-sm text-gray-600">Thinking...</span>
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex space-x-2 items-center">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask about your tickets..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition-colors"
                  disabled={isLoading}
                />
                <button
                  onClick={startCamera}
                  disabled={isLoading}
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                  title="Upload Image"
                >
                  <Camera className="w-6 h-6 text-gray-600" />
                </button>
                <button
                  onClick={getCurrentLocation}
                  disabled={isLoading || isGettingLocation}
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                  title="Share Location"
                >
                  {isGettingLocation ? (
                    <Loader className="w-6 h-6 text-gray-600 animate-spin" />
                  ) : (
                    <MapPin className="w-6 h-6 text-gray-600" />
                  )}
                </button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isLoading}
                  className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white p-2 rounded-full transition-colors"
                >
                  <Send className="w-5 h-5" />
                </motion.button>
              </div>
            </div>

            {/* Camera Preview */}
            {isCameraOpen && (
              <div className="absolute bottom-24 right-6 w-96 h-[360px] bg-black rounded-2xl shadow-2xl z-60 flex flex-col overflow-hidden">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  className="flex-1 rounded-t-2xl"
                />
                <div className="p-4 bg-gray-900 flex justify-between items-center rounded-b-2xl">
                  <button
                    onClick={() => {
                      videoStream.getTracks().forEach(track => track.stop());
                      setIsCameraOpen(false);
                    }}
                    className="bg-red-600 text-white px-4 py-2 rounded-xl font-semibold hover:bg-red-700 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={capturePhoto}
                    className="bg-green-600 text-white px-4 py-2 rounded-xl font-semibold hover:bg-green-700 transition-colors"
                  >
                    Capture
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;
