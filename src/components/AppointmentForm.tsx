
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AppointmentData } from './VoiceAppointmentBooking';
import { Save, X } from 'lucide-react';

interface AppointmentFormProps {
  initialData?: AppointmentData;
  onSave: (data: AppointmentData) => void;
  onCancel: () => void;
  title?: string;
}

const AppointmentForm: React.FC<AppointmentFormProps> = ({
  initialData,
  onSave,
  onCancel,
  title = "Appointment Details"
}) => {
  const [formData, setFormData] = useState<AppointmentData>(
    initialData || {
      patientName: '',
      doctor: '',
      date: '',
      time: '',
      purpose: ''
    }
  );

  const handleChange = (field: keyof AppointmentData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const isValid = formData.patientName && formData.doctor && formData.date && formData.time;

  return (
    <Card className="bg-white shadow-lg border-gray-200">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200">
        <CardTitle className="text-lg text-gray-900">{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="patientName" className="text-sm font-medium text-gray-700">
                Patient Name *
              </Label>
              <Input
                id="patientName"
                type="text"
                value={formData.patientName}
                onChange={(e) => handleChange('patientName', e.target.value)}
                placeholder="Enter patient name"
                className="w-full"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="doctor" className="text-sm font-medium text-gray-700">
                Doctor *
              </Label>
              <Input
                id="doctor"
                type="text"
                value={formData.doctor}
                onChange={(e) => handleChange('doctor', e.target.value)}
                placeholder="Enter doctor name"
                className="w-full"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="date" className="text-sm font-medium text-gray-700">
                Date *
              </Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => handleChange('date', e.target.value)}
                className="w-full"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="time" className="text-sm font-medium text-gray-700">
                Time *
              </Label>
              <Input
                id="time"
                type="time"
                value={formData.time}
                onChange={(e) => handleChange('time', e.target.value)}
                className="w-full"
                required
              />
            </div>

            <div className="md:col-span-2 space-y-2">
              <Label htmlFor="purpose" className="text-sm font-medium text-gray-700">
                Purpose of Visit
              </Label>
              <Input
                id="purpose"
                type="text"
                value={formData.purpose}
                onChange={(e) => handleChange('purpose', e.target.value)}
                placeholder="Enter purpose of visit"
                className="w-full"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200">
            <Button
              type="button"
              onClick={onCancel}
              variant="outline"
              className="border-gray-300 text-gray-600 hover:bg-gray-50 px-6"
            >
              <X className="w-4 h-4 mr-2" />
              Cancel
            </Button>
            
            <Button
              type="submit"
              disabled={!isValid}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6"
            >
              <Save className="w-4 h-4 mr-2" />
              Save
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default AppointmentForm;
