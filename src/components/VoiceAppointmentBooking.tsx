
import React, { useState, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Mic, MicOff, Play, Square } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useVoiceRecognition } from '../hooks/useVoiceRecognition';
import AppointmentForm from './AppointmentForm';
import AppointmentConfirmation from './AppointmentConfirmation';

export interface AppointmentData {
  patientName: string;
  doctor: string;
  date: string;
  time: string;
  purpose: string;
}

const VoiceAppointmentBooking = () => {
  const [appointmentData, setAppointmentData] = useState<AppointmentData | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const { toast } = useToast();

  const {
    transcript,
    isListening,
    isSupported,
    startListening,
    stopListening,
    resetTranscript
  } = useVoiceRecognition();

  const extractAppointmentData = useCallback((text: string): AppointmentData | null => {
    console.log('Extracting data from:', text);
    
    // Simple extraction logic - in a real app, you'd use more sophisticated NLP
    const lowerText = text.toLowerCase();
    
    // Extract patient name (after "for" or "patient")
    const patientMatch = lowerText.match(/(?:for|patient)\s+([a-zA-Z\s]+?)(?:\s|$|with|on|at)/);
    const patientName = patientMatch ? patientMatch[1].trim() : '';
    
    // Extract doctor name (after "doctor", "dr", "with")
    const doctorMatch = lowerText.match(/(?:doctor|dr\.?|with)\s+([a-zA-Z\s]+?)(?:\s|$|on|at)/);
    const doctor = doctorMatch ? doctorMatch[1].trim() : '';
    
    // Extract date (look for date patterns)
    const dateMatch = lowerText.match(/(?:on|date)\s+([a-zA-Z0-9\s,]+?)(?:\s|$|at)/);
    const date = dateMatch ? dateMatch[1].trim() : '';
    
    // Extract time (look for time patterns)
    const timeMatch = lowerText.match(/(?:at|time)\s+([0-9:apmAPM\s]+)/);
    const time = timeMatch ? timeMatch[1].trim() : '';
    
    // Extract purpose (after "for" at the end)
    const purposeMatch = lowerText.match(/(?:for|regarding|about)\s+([a-zA-Z\s]+?)$/);
    const purpose = purposeMatch ? purposeMatch[1].trim() : 'General consultation';

    if (patientName || doctor || date || time) {
      return {
        patientName: patientName || 'Not specified',
        doctor: doctor || 'Not specified',
        date: date || 'Not specified',
        time: time || 'Not specified',
        purpose: purpose || 'General consultation'
      };
    }
    
    return null;
  }, []);

  const handleVoiceComplete = useCallback(() => {
    if (transcript.trim()) {
      const extracted = extractAppointmentData(transcript);
      if (extracted) {
        setAppointmentData(extracted);
        setShowConfirmation(true);
        toast({
          title: "Voice input processed!",
          description: "Please review the extracted appointment details.",
        });
      } else {
        toast({
          title: "Could not extract appointment details",
          description: "Please try speaking more clearly or use the manual form.",
          variant: "destructive"
        });
      }
    }
  }, [transcript, extractAppointmentData, toast]);

  const handleStartListening = () => {
    resetTranscript();
    startListening();
    toast({
      title: "Listening...",
      description: "Speak clearly about the appointment details.",
    });
  };

  const handleStopListening = () => {
    stopListening();
    if (transcript.trim()) {
      handleVoiceComplete();
    }
  };

  const handleManualEntry = () => {
    setShowConfirmation(true);
    setAppointmentData({
      patientName: '',
      doctor: '',
      date: '',
      time: '',
      purpose: ''
    });
  };

  const handleConfirm = (data: AppointmentData) => {
    console.log('Booking appointment:', data);
    
    // Store in localStorage for demo purposes
    const appointments = JSON.parse(localStorage.getItem('appointments') || '[]');
    const newAppointment = {
      id: Date.now().toString(),
      ...data,
      status: 'scheduled',
      createdAt: new Date().toISOString()
    };
    appointments.push(newAppointment);
    localStorage.setItem('appointments', JSON.stringify(appointments));
    
    toast({
      title: "Appointment booked successfully!",
      description: `Appointment for ${data.patientName} has been scheduled.`,
    });
    
    // Reset state
    setAppointmentData(null);
    setShowConfirmation(false);
    resetTranscript();
  };

  const handleCancel = () => {
    setAppointmentData(null);
    setShowConfirmation(false);
    resetTranscript();
  };

  if (!isSupported) {
    return (
      <div className="text-center p-8">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <MicOff className="w-8 h-8 text-red-600" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Voice Recognition Not Supported</h3>
        <p className="text-gray-600 mb-4">Your browser doesn't support voice recognition. Please use manual entry.</p>
        <Button onClick={handleManualEntry} className="bg-blue-600 hover:bg-blue-700">
          Use Manual Entry
        </Button>
      </div>
    );
  }

  if (showConfirmation && appointmentData) {
    return (
      <AppointmentConfirmation
        appointmentData={appointmentData}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        onEdit={(data) => setAppointmentData(data)}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Voice Input Section */}
      <div className="text-center">
        <div className="mb-6">
          <div className={`w-24 h-24 rounded-full mx-auto mb-4 flex items-center justify-center transition-all duration-300 ${
            isListening 
              ? 'bg-red-500 animate-pulse shadow-lg shadow-red-500/30' 
              : 'bg-blue-600 hover:bg-blue-700 shadow-lg'
          }`}>
            {isListening ? (
              <Square className="w-8 h-8 text-white" />
            ) : (
              <Mic className="w-8 h-8 text-white" />
            )}
          </div>
          
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            {isListening ? 'Listening...' : 'Click to Start Voice Input'}
          </h3>
          <p className="text-gray-600 text-sm">
            {isListening 
              ? 'Speak clearly about the appointment details' 
              : 'Say something like: "Book appointment for John Smith with Dr. Johnson on Monday at 2 PM for checkup"'
            }
          </p>
        </div>

        <div className="flex justify-center space-x-4">
          {!isListening ? (
            <Button 
              onClick={handleStartListening}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3"
            >
              <Mic className="w-4 h-4 mr-2" />
              Start Recording
            </Button>
          ) : (
            <Button 
              onClick={handleStopListening}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-3"
            >
              <Square className="w-4 h-4 mr-2" />
              Stop Recording
            </Button>
          )}
          
          <Button 
            onClick={handleManualEntry}
            variant="outline"
            className="px-6 py-3 border-blue-300 text-blue-600 hover:bg-blue-50"
          >
            Manual Entry
          </Button>
        </div>
      </div>

      {/* Transcript Display */}
      {transcript && (
        <Card className="bg-gray-50 border-gray-200">
          <CardContent className="p-4">
            <h4 className="font-semibold text-gray-900 mb-2">Voice Input:</h4>
            <p className="text-gray-700 italic">"{transcript}"</p>
          </CardContent>
        </Card>
      )}

      {/* Instructions */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-4">
          <h4 className="font-semibold text-blue-900 mb-2">Voice Input Tips:</h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Speak clearly and at a moderate pace</li>
            <li>• Include patient name, doctor, date, time, and purpose</li>
            <li>• Example: "Book appointment for Sarah Wilson with Dr. Smith on Friday at 3 PM for annual checkup"</li>
            <li>• You can edit the details after voice input</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default VoiceAppointmentBooking;
