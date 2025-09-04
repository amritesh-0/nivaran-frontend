import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, MapPin, CheckCircle, X, Loader } from 'lucide-react';

const RaiseProblem = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    image: null,
    location: '',
    digipinCode: '',
    category: '',
    criticality: 'medium',
    description: '',
    ticketId: null
  });
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const categories = [
    'Road & Infrastructure',
    'Street Lighting',
    'Waste Management',
    'Water Supply',
    'Electricity',
    'Public Safety',
    'Noise Pollution',
    'Other'
  ];

  const formVariants = {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 }
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      videoRef.current.srcObject = stream;
      setIsCameraOpen(true);
    } catch (err) {
      console.error('Error accessing camera:', err);
      alert('Unable to access camera. Please check permissions.');
    }
  };

  const capturePhoto = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    const context = canvas.getContext('2d');
    
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0);
    
    const imageDataUrl = canvas.toDataURL('image/jpeg');
    setFormData({ ...formData, image: imageDataUrl });
    
    video.srcObject.getTracks().forEach(track => track.stop());
    setIsCameraOpen(false);
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const digipinCode = `DIG-${Math.floor(latitude * 1000)}-${Math.floor(longitude * 1000)}`;
          setFormData({
            ...formData,
            location: `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`,
            digipinCode: digipinCode
          });
        },
        (error) => {
          console.error('Error getting location:', error);
          alert('Unable to get location. Please enable location services.');
        }
      );
    }
  };

  const isStepOneComplete = formData.image && formData.location;
  const isStepTwoComplete = formData.category && formData.criticality && formData.description.length > 10;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (step === 1 && isStepOneComplete) {
      setStep(2);
    } else if (step === 2 && isStepTwoComplete) {
      confirmSubmission();
    }
  };

  const confirmSubmission = () => {
    const ticketId = `CIT-${new Date().getFullYear()}-${String(Date.now()).slice(-4)}`;
    setFormData({ ...formData, ticketId });
    setStep(3);
  };

  const resetForm = () => {
    setFormData({
      image: null,
      location: '',
      digipinCode: '',
      category: '',
      criticality: 'medium',
      description: '',
      ticketId: null
    });
    setStep(1);
  };

  const renderContent = () => {
    switch (step) {
      case 1:
        return (
          <motion.form
            key="step1"
            onSubmit={handleSubmit}
            className="space-y-8"
            variants={formVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            {/* Photo Capture Section */}
            <div>
              <label className="block text-lg font-semibold text-gray-900 mb-4">
                Capture Problem Photo <span className="text-red-500">*</span>
              </label>
              <div className="border-2 border-dashed border-gray-200 rounded-2xl p-8 text-center hover:border-gray-300 transition-colors duration-200">
                {!formData.image ? (
                  !isCameraOpen ? (
                    <div>
                      <Camera className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600 mb-4">Capture a photo of the problem</p>
                      <motion.button
                        type="button"
                        onClick={startCamera}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-gray-900 text-white px-6 py-3 rounded-xl font-semibold hover:bg-gray-800 transition-all duration-300"
                      >
                        Open Camera
                      </motion.button>
                    </div>
                  ) : (
                    <div>
                      <video
                        ref={videoRef}
                        autoPlay
                        className="w-full max-w-md mx-auto rounded-xl mb-4"
                      />
                      <motion.button
                        type="button"
                        onClick={capturePhoto}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-gray-900 text-white px-6 py-3 rounded-xl font-semibold hover:bg-gray-800 transition-all duration-300"
                      >
                        Capture Photo
                      </motion.button>
                    </div>
                  )
                ) : (
                  <div className="relative">
                    <img
                      src={formData.image}
                      alt="Captured problem"
                      className="w-full max-w-md mx-auto rounded-xl"
                    />
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, image: null })}
                      className="absolute top-2 right-2 bg-white text-gray-800 p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}
                <canvas ref={canvasRef} style={{ display: 'none' }} />
              </div>
            </div>

            {/* Location Section */}
            <div>
              <label className="block text-lg font-semibold text-gray-900 mb-4">
                Location Details <span className="text-red-500">*</span>
              </label>
              <div className="space-y-4">
                <div className="flex space-x-4">
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="Auto-detected location"
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition-colors"
                    readOnly
                    required
                  />
                  <motion.button
                    type="button"
                    onClick={getCurrentLocation}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 bg-gray-900 text-white rounded-xl font-semibold hover:bg-gray-800 transition-all duration-300 flex items-center space-x-2"
                  >
                    <MapPin className="w-5 h-5" />
                    <span>Get Location</span>
                  </motion.button>
                </div>
                {formData.digipinCode && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="bg-gray-100 p-4 rounded-xl"
                  >
                    <p className="text-sm text-gray-700">
                      <span className="font-semibold">Digipin Code:</span> {formData.digipinCode}
                    </p>
                  </motion.div>
                )}
              </div>
            </div>

            {/* Next Button */}
            <motion.button
              type="submit"
              disabled={!isStepOneComplete}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-blue-600 text-white py-4 rounded-xl font-semibold text-lg hover:bg-blue-700 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
            >
              Continue to Details
            </motion.button>
          </motion.form>
        );

      case 2:
        return (
          <motion.form
            key="step2"
            onSubmit={handleSubmit}
            className="space-y-8"
            variants={formVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            {/* Category Selection */}
            <div>
              <label className="block text-lg font-semibold text-gray-900 mb-4">
                Problem Category <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition-colors"
                required
              >
                <option value="">Select a category...</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Criticality Selection */}
            <div>
              <label className="block text-lg font-semibold text-gray-900 mb-4">
                Criticality Level <span className="text-red-500">*</span>
              </label>
              <div className="flex space-x-4">
                {['low', 'medium', 'high'].map((level) => (
                  <motion.button
                    key={level}
                    type="button"
                    onClick={() => setFormData({ ...formData, criticality: level })}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`flex-1 py-3 rounded-xl font-semibold transition-all duration-200 ${
                      formData.criticality === level
                        ? level === 'low' 
                          ? 'bg-green-500 text-white shadow-md' 
                          : level === 'medium'
                          ? 'bg-orange-500 text-white shadow-md'
                          : 'bg-red-500 text-white shadow-md'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {level.charAt(0).toUpperCase() + level.slice(1)}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-lg font-semibold text-gray-900 mb-4">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Please provide details about the problem (min 10 characters)..."
                rows="4"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition-colors resize-none"
                required
                minLength="10"
              />
            </div>
            
            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={!isStepTwoComplete}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-blue-600 text-white py-4 rounded-xl font-semibold text-lg hover:bg-blue-700 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
            >
              Submit Problem
            </motion.button>
            <motion.button
              type="button"
              onClick={() => setStep(1)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full text-blue-600 border border-blue-600 py-3 rounded-xl font-semibold transition-colors duration-300 hover:bg-blue-50"
            >
              Back
            </motion.button>
          </motion.form>
        );

      case 3:
        return (
          <motion.div
            key="step3"
            className="max-w-md mx-auto"
            variants={formVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <div className="bg-white rounded-3xl p-8 shadow-xl text-center">
              <motion.div
                initial={{ scale: 0, rotate: 180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <CheckCircle className="w-8 h-8 text-green-600" />
              </motion.div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Problem Submitted Successfully!</h2>
              <div className="bg-gray-50 rounded-xl p-4 mb-6">
                <p className="text-sm text-gray-600 mb-2">Your Ticket ID:</p>
                <p className="text-2xl font-bold text-gray-900">#{formData.ticketId}</p>
              </div>
              <p className="text-gray-600 mb-8">Thank you for reporting! You can track the progress using your ticket ID.</p>
              <motion.button
                onClick={resetForm}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-all duration-300"
              >
                Report Another Problem
              </motion.button>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-3xl mx-auto"
    >
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
        <div className="bg-blue-50/50 p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Raise a Problem</h1>
          <p className="text-gray-600">Help improve your community by reporting issues</p>
        </div>

        <div className="p-8">
          <AnimatePresence mode="wait">
            {renderContent()}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

export default RaiseProblem;