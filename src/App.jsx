import React, { useState } from 'react';
import { Upload, AlertCircle, CheckCircle, Loader } from 'lucide-react';

export default function ExpenseUploader() {
  const [activeTab, setActiveTab] = useState('DD_DAMAS');
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [status, setStatus] = useState(null); // 'success', 'error', null
  const [statusMessage, setStatusMessage] = useState('');

  const businesses = [
    { id: 'DD_DAMAS', name: 'Dashing Diva Damas', icon: '💄' },
    { id: 'DD_SHAH', name: 'Dashing Diva Shah Alam', icon: '💅' },
    { id: 'Q_NAILS', name: 'Q Nails', icon: '✨' },
  ];

  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'];
      if (validTypes.includes(selectedFile.type)) {
        setFile(selectedFile);
        setStatus(null);
      } else {
        setStatus('error');
        setStatusMessage('Please upload an image (JPG, PNG, WebP) or PDF');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      setStatus('error');
      setStatusMessage('Please select a receipt file');
      return;
    }

    setUploading(true);
    setStatus(null);

    try {
      // Step 1: Upload file to n8n webhook
      const formData = new FormData();
      formData.append('file', file);
      formData.append('business', activeTab);

      // Replace with your n8n webhook URL
      const n8nWebhookUrl = 'https://ralexo1881.app.n8n.cloud/webhook-test/6d830363-ae87-468d-a130-ce676a53825d';

      const response = await fetch(n8nWebhookUrl, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setStatus('success');
        setStatusMessage('✅ Receipt uploaded! AI is extracting data now.');
        
        // Reset form
        setFile(null);
        
        // Clear status after 3 seconds
        setTimeout(() => setStatus(null), 3000);
      } else {
        throw new Error('Upload failed');
      }
    } catch (error) {
      setStatus('error');
      setStatusMessage('Upload failed. Check your n8n webhook URL.');
      console.error(error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">📸 Quick Receipt Upload</h1>
          <p className="text-slate-600">Snap, upload, done. AI handles the rest.</p>
        </div>

        {/* Business Tabs */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 mb-6 p-1 flex gap-1">
          {businesses.map((biz) => (
            <button
              key={biz.id}
              onClick={() => setActiveTab(biz.id)}
              className={`flex-1 py-3 px-4 rounded-md transition-all font-medium text-sm ${
                activeTab === biz.id
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <span className="mr-1">{biz.icon}</span>
              <span className="hidden sm:inline">{biz.name}</span>
              <span className="sm:hidden">{biz.name.split(' ')[0]}</span>
            </button>
          ))}
        </div>

        {/* Main Form Card */}
        <div className="bg-white rounded-lg shadow-lg border border-slate-200 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* File Upload Area */}
            <div>
              <div className="relative">
                <input
                  type="file"
                  accept="image/*,.pdf"
                  onChange={handleFileChange}
                  className="hidden"
                  id="file-upload"
                  disabled={uploading}
                />
                <label
                  htmlFor="file-upload"
                  className={`flex flex-col items-center justify-center p-12 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${
                    file
                      ? 'border-green-500 bg-green-50'
                      : 'border-slate-300 bg-slate-50 hover:bg-slate-100'
                  }`}
                >
                  {file ? (
                    <>
                      <CheckCircle className="w-12 h-12 text-green-600 mb-3" />
                      <p className="text-sm font-medium text-green-900">{file.name}</p>
                      <p className="text-xs text-green-700 mt-1">Click to change</p>
                    </>
                  ) : (
                    <>
                      <Upload className="w-12 h-12 text-slate-400 mb-3" />
                      <p className="text-base font-medium text-slate-900">Drop receipt here or click</p>
                      <p className="text-xs text-slate-500 mt-2">Image or PDF</p>
                    </>
                  )}
                </label>
              </div>
            </div>

            {/* Status Messages */}
            {status === 'success' && (
              <div className="p-4 bg-green-50 border border-green-300 rounded-lg flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-green-900">Receipt received!</p>
                  <p className="text-xs text-green-700 mt-0.5">{statusMessage}</p>
                </div>
              </div>
            )}

            {status === 'error' && (
              <div className="p-4 bg-red-50 border border-red-300 rounded-lg flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-800">{statusMessage}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={uploading || !file}
              className={`w-full py-3 px-4 rounded-lg font-semibold transition-all text-base ${
                uploading || !file
                  ? 'bg-slate-300 text-slate-500 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700 shadow-md'
              }`}
            >
              {uploading ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader className="w-5 h-5 animate-spin" />
                  Processing...
                </span>
              ) : (
                '📤 Upload Receipt'
              )}
            </button>

            {/* Help Text */}
            <p className="text-xs text-slate-500 text-center">
              AI will automatically extract date, amount & category.
            </p>
          </form>
        </div>

        {/* Info Cards */}
        <div className="mt-8 grid grid-cols-3 gap-3 text-center">
          <div className="bg-white p-4 rounded-lg border border-slate-200">
            <p className="text-2xl">📸</p>
            <p className="text-xs font-medium text-slate-600 mt-2">Upload</p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-slate-200">
            <p className="text-2xl">🤖</p>
            <p className="text-xs font-medium text-slate-600 mt-2">AI Reads</p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-slate-200">
            <p className="text-2xl">📊</p>
            <p className="text-xs font-medium text-slate-600 mt-2">Auto P&L</p>
          </div>
        </div>
      </div>
    </div>
  );
}
