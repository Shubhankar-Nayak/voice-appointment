
import React, { useState } from 'react';
import VoiceAppointmentBooking from '../components/VoiceAppointmentBooking';
import AppointmentList from '../components/AppointmentList';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Calendar, Mic, Users } from 'lucide-react';

const Index = () => {
  const [activeTab, setActiveTab] = useState<'book' | 'appointments'>('book');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Voice Appointment System</h1>
                <p className="text-sm text-gray-600">Medical Scheduling Platform</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <Users className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm text-gray-700">Front Desk</span>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex space-x-4 mb-8">
          <button
            onClick={() => setActiveTab('book')}
            className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2 ${
              activeTab === 'book'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-white text-gray-600 hover:bg-blue-50 border border-gray-200'
            }`}
          >
            <Mic className="w-4 h-4" />
            <span>Book Appointment</span>
          </button>
          <button
            onClick={() => setActiveTab('appointments')}
            className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2 ${
              activeTab === 'appointments'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-white text-gray-600 hover:bg-blue-50 border border-gray-200'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Appointments</span>
          </button>
        </div>

        {/* Content */}
        <div className="space-y-6">
          {activeTab === 'book' && (
            <Card className="bg-white shadow-lg border-0">
              <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-lg">
                <CardTitle className="flex items-center space-x-2">
                  <Mic className="w-5 h-5" />
                  <span>Voice Appointment Booking</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <VoiceAppointmentBooking />
              </CardContent>
            </Card>
          )}
          
          {activeTab === 'appointments' && (
            <Card className="bg-white shadow-lg border-0">
              <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-lg">
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5" />
                  <span>Scheduled Appointments</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <AppointmentList />
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
