
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Edit, X, Calendar, Clock, User, Stethoscope } from 'lucide-react';
import { AppointmentData } from './VoiceAppointmentBooking';
import AppointmentForm from './AppointmentForm';

interface AppointmentConfirmationProps {
  appointmentData: AppointmentData;
  onConfirm: (data: AppointmentData) => void;
  onCancel: () => void;
  onEdit: (data: AppointmentData) => void;
}

const AppointmentConfirmation: React.FC<AppointmentConfirmationProps> = ({
  appointmentData,
  onConfirm,
  onCancel,
  onEdit
}) => {
  const [isEditing, setIsEditing] = React.useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSaveEdit = (data: AppointmentData) => {
    onEdit(data);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <AppointmentForm
        initialData={appointmentData}
        onSave={handleSaveEdit}
        onCancel={handleCancelEdit}
        title="Edit Appointment Details"
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Review Appointment Details</h2>
        <p className="text-gray-600">Please confirm the extracted information is correct</p>
      </div>

      <Card className="bg-white shadow-lg border-gray-200">
        <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 border-b border-gray-200">
          <CardTitle className="text-lg text-gray-900">Appointment Summary</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Patient Name</p>
                <p className="text-lg font-semibold text-gray-900">{appointmentData.patientName}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <Stethoscope className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Doctor</p>
                <p className="text-lg font-semibold text-gray-900">{appointmentData.doctor}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <Calendar className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Date</p>
                <p className="text-lg font-semibold text-gray-900">{appointmentData.date}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                <Clock className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Time</p>
                <p className="text-lg font-semibold text-gray-900">{appointmentData.time}</p>
              </div>
            </div>

            <div className="md:col-span-2">
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm font-medium text-gray-500 mb-2">Purpose of Visit</p>
                <p className="text-gray-900">{appointmentData.purpose}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-center space-x-4">
        <Button
          onClick={() => onConfirm(appointmentData)}
          className="bg-green-600 hover:bg-green-700 text-white px-8 py-3"
        >
          <CheckCircle className="w-4 h-4 mr-2" />
          Confirm Appointment
        </Button>
        
        <Button
          onClick={handleEdit}
          variant="outline"
          className="border-blue-300 text-blue-600 hover:bg-blue-50 px-8 py-3"
        >
          <Edit className="w-4 h-4 mr-2" />
          Edit Details
        </Button>
        
        <Button
          onClick={onCancel}
          variant="outline"
          className="border-gray-300 text-gray-600 hover:bg-gray-50 px-8 py-3"
        >
          <X className="w-4 h-4 mr-2" />
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default AppointmentConfirmation;
